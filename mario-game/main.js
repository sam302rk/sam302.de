"use strict";

const CellStates = {
    NONE: 'none',
    NONE_CLICKED: 'none_clicked',
    TARGET: 'target',
    TARGET_CLICKED: 'target_clicked',
    ANY_CLICKED: 'any_clicked'
}

if (window.location.search !== "") {
    let data = atob(window.location.search.slice(1))
    console.log(data)
    let config = JSON.parse(data)
    start(config)
} else {
    fetch('config.json').then(async resp => {
        if (!resp.ok) return
        let config = JSON.parse(await resp.text())
        start(config)
    })
}

function start(config) {
    console.table(config)
    setup(config).then()
}

async function draw_cell(x, y, cellState, config, context) {
    const scale = config.grid_size.scale
    const xa = x * scale
    const ya = y * scale
    
    context.fillStyle = config.colors[cellState] ?? '#cba6f7'
    context.strokeStyle = '#000000'

    context.fillRect(xa, ya, scale, scale)
    context.strokeRect(xa, ya, scale, scale)
}

async function listen(canvas, context, config, on_cell_click) {
    canvas.addEventListener('click', event => {
        const scale = config.grid_size.scale
        for (let x = 0; x < config.grid_size.width; x++) {
            for (let y = 0; y < config.grid_size.height; y++) {
                const xa = x * scale
                const ya = y * scale
                const path = new Path2D()
                path.rect(xa, ya, scale, scale)

                if (context.isPointInPath(path, event.offsetX, event.offsetY)) {
                    on_cell_click(x, y)
                }
            }
        }
    })
}

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check_if_value_is_in_two_arrays(value, arr1, arr2) {
    return arr1.includes(value) && arr2.includes(value)
}

async function setup(config) {
    const text = document.getElementById('text')
    const canvas = document.getElementById('game')
    canvas.setAttribute('width', config.grid_size.width * config.grid_size.scale)
    canvas.setAttribute('height', config.grid_size.height * config.grid_size.scale)
    const context = canvas.getContext('2d')

    const cells = await generate_cells(config)
    let current_round = {
        targets: await choose_target_cells(cells, config),
        clicked_cells: []
    }

    async function process_draw() {
        console.debug(current_screen)
        await process_new_round(await current_screen.draw(text, canvas, context, current_round))
    }

    async function process_new_round(new_round_values) {
        if(new_round_values === null) {
            return
        } else if (new_round_values === undefined) {
            current_round = {
                targets: await choose_target_cells(cells, config),
                clicked_cells: []
            }
        } else {
            current_round = new_round_values
        }
    }

    let current_screen = await title_screen(config, async new_screen => {
        console.info(`Screen changed from ${current_screen.screen_name} to ${new_screen.screen_name}`)
        current_screen = new_screen
        await process_draw()
    })

    await listen(canvas, context, config, async (x, y) => {
        console.info(`on_cell_click event of ${current_screen.screen_name} called for cell (${x}|${y})`)
        await process_new_round(await current_screen.on_cell_click(x, y, current_round, context))
    })
    await process_draw()
}

async function title_screen(config, on_screen_change) {
    return {
        screen_name: 'title_screen',
        draw: async (text, canvas, context, round) => {
            text.innerHTML = 'Click anywhere inside the black box to start!' // TODO
            context.fillStyle = '#000000'
            context.fillRect(0, 0, config.grid_size.width * config.grid_size.scale, config.grid_size.height * config.grid_size.scale)
            return undefined
        },
        on_cell_click: async (x, y, round, context) => {
            on_screen_change(await memorize_screen(config, on_screen_change))
            return null
        }
    }
}

async function memorize_screen(config, on_screen_change) {
    return {
        screen_name: 'memorize_screen',
        draw: async (text, canvas, context, round) => {
            for (let x = 0; x < config.grid_size.width; x++) {
                for (let y = 0; y < config.grid_size.height; y++) {
                    let is_target = false
                    for (const target_cell of round.targets) {
                        if (target_cell.x === x && target_cell.y === y) {
                            is_target = true
                            break
                        }
                    }
                    await draw_cell(x, y, is_target ? CellStates.TARGET : CellStates.NONE, config, context)
                }
            }
            text.innerHTML = 'Memorize it!' // TODO
            setTimeout(async () => on_screen_change(await play_screen(config, on_screen_change)), config.timing.memorize_time)
            return null
        },
        on_cell_click: async (x, y, round, context) => { return null }
    }
}

async function play_screen(config, on_screen_change) {
    async function decide() {
        on_screen_change(await decider_screen(config, on_screen_change))
    }
    const timeout_id = setTimeout(decide, config.timing.max_play_time)

    return {
        screen_name: 'play_screen',
        draw: async (text, canvas, context, round) => {
            text.innerHTML = "Repeat it!" // TODO

            for (let x = 0; x < config.grid_size.width; x++) {
                for (let y = 0; y < config.grid_size.height; y++) {
                    await draw_cell(x, y, CellStates.NONE, config, context)
                }
            }

            return null
        },
        on_cell_click: async (x, y, round, context) => {
            let cell_already_clicked = round.clicked_cells.findIndex(c => c.x === x && c.y === y)
            let new_state
            if (cell_already_clicked !== -1) {
                round = round.clicked_cells.splice(cell_already_clicked, 1)
                new_state = CellStates.NONE
            } else {
                round.clicked_cells.push({ x: x, y: y })
                new_state = CellStates.ANY_CLICKED
            }
            
            await draw_cell(x, y, new_state, config, context)
            return round
        }
    }
}

async function decider_screen(config, on_screen_change) {
    return {
        screen_name: 'decider_screen',
        draw: async (text, canvas, context, round) => {
            console.table(round)
            const has_won = round.clicked_cells
                .every(a_clicked_cell => round.targets
                    .findIndex(a_target_cell => a_clicked_cell.x === a_target_cell.x
                        && a_clicked_cell.y === a_target_cell.y) !== -1)

            let cells_dbg = []

            for (let x = 0; x < config.grid_size.width; x++) {
                for (let y = 0; y < config.grid_size.height; y++) {
                    let current_cell = { x: x, y: y }
                    let is_target = round.targets.findIndex(c => c.x === current_cell.x && c.y === current_cell.y) !== -1
                    let is_clicked = round.clicked_cells.findIndex(c => c.x === current_cell.x && c.y === current_cell.y) !== -1
                    let is_clicked_target = is_target && is_clicked

                    let current_cell_state = CellStates.NONE

                    if (is_clicked_target) {
                        current_cell_state = CellStates.TARGET_CLICKED
                    } else if (is_target) {
                        current_cell_state = CellStates.TARGET
                    } else if (is_clicked) {
                        current_cell_state = CellStates.NONE_CLICKED
                    }

                    cells_dbg.push({
                        cell: [x, y],
                        is_target: is_target,
                        is_clicked: is_clicked,
                        state: current_cell_state
                    })

                    await draw_cell(x, y, current_cell_state, config, context)
                }
            }

            console.table(cells_dbg)

            if (has_won) {
                on_screen_change(await win_screen(config, on_screen_change))
            } else {
                on_screen_change(await lose_screen(config, on_screen_change))
            }
            return null
        },
        on_cell_click: (x, y, round, context) => { return null }
    }
}

async function win_screen(config, on_screen_change) {
    return {
        screen_name: 'win_screen',
        draw: async (text, canvas, context, round) => {
            text.innerHTML = 'Good job. Click anywhere inside the game to start the next round.' // TODO
        },
        on_cell_click: async (x, y, round, context) => {
            on_screen_change(await memorize_screen(config, on_screen_change))
            return null
        }
    }
}

async function lose_screen(config, on_screen_change) {
    return {
        screen_name: 'lose_screen',
        draw: async (text, canvas, context, round) => {
            text.innerHTML = 'You failed. Click anywhere inside the game to start the next round.' // TODO
        },
        on_cell_click: async (x, y, round, context) => {
            on_screen_change(await memorize_screen(config, on_screen_change))
            return null
        }
    }
}

async function generate_cells(config) {
    const cells = []

    for (let x = 0; x < config.grid_size.width; x++) {
        for (let y = 0; y < config.grid_size.height; y++) {
            cells.push({ x: x, y: y })
        }
    }

    return cells
}

async function choose_target_cells(cells, config) {
    let shuffled_cells = cells
    shuffle_array(shuffled_cells)
    const target_amount = random_int(config.target_amount.min, config.target_amount.max)
    const targets = []

    for (const _ of Array(target_amount).keys()) {
        targets.push(shuffled_cells.pop())
    }

    return targets
}