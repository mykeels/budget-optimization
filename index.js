/**
 * THIS IS AN INCORRECT PROGRAM, 
 * BECAUSE IT MAKES THE BUDGETED DAYS VARIABLE, 
 * RATHER THAN FIXED, 
 * SO IT HAS TO BE REVISED!
 * 
 * IT'S WORTH LOOKING AT THOUGH, 
 * COS IT'S A GOOD EXAMPLE OF LATE-ACCEPTANCE HILL CLIMBING,
 * WITH A SPRINKLE OF BACKTRACKING.
 */

const activities = require('./data.json')
const MIN_BUDGET = 100, MAX_BUDGET = 5000
const BUDGET = 5000, MIN_DAY_BUDGET = 50
const MIN_DAY_ACTIVITIES = 3, COMMUTE_TIME = 30
const DAY_DURATION = 720, DAY_PROBABILITY = 0.3
const BACKTRACK_LENGTH = 100

const fitness = solution => {
    if (!solution || (solution.length != activities.length)) return Number.MAX_VALUE
    else {
        let budget = {}, duration = {}, counts = {}
        for (let i = 0; i < solution.length; i++) {
            const activity = activities[i]
            const day = Number(solution[i])
            if (day > 0) {
                duration[day] = Number(duration[day] || 0) + activity.duration + COMMUTE_TIME
                counts[day] = Number(counts[day] || 0) + 1
                budget[day] = Number(budget[day] || 0) + activity.price
            }
            
        }
        // make sure no day's activities are less than the minimum
        if (Object.values(counts).some(c => c < MIN_DAY_ACTIVITIES)) return Number.MAX_VALUE
        else if (Object.values(budget).some(b => b < MIN_DAY_BUDGET)) return Number.MAX_VALUE
        else if (!Object.keys(duration).length) return Number.MAX_VALUE
        else {
            let result = Object.entries(duration).map(([ day, value ]) => {
                // if (value < DAY_DURATION) return (DAY_DURATION - value) / 2
                if (value > DAY_DURATION) return (value - DAY_DURATION)
                else return 0
            }).reduce((a, b) => a + b, 0)

            const tripBudget = Object.values(budget).reduce((a, b) => a + b, 0)
            if (tripBudget < BUDGET) result += (BUDGET - tripBudget) / 2
            else if (tripBudget > BUDGET) result += (tripBudget - BUDGET) * 2.5
            return result
        }
    }
}

const up = solution => {
    const indices = []
    let maxDay = 0
    solution = solution.split('') // clone the argument
    for (let i = 0; i < solution.length; i++) {
        if (!Number(solution[i])) indices.push(i)
        else {
            maxDay = Math.max(maxDay, Number(solution[i]))
        }
    }
    if (indices.length) {
        const index = indices[Math.floor(Math.random() * indices.length)]
        //flip a coin to decide whether to begin a new day
        if (maxDay && Math.random() < DAY_PROBABILITY) {
            maxDay = Math.max(maxDay, 1)
            solution[index] = Math.ceil(Math.random() * maxDay)
        }
        else {
            // begin a new day
            const selectedIndices = {}
            for (let i = 1; i <= MIN_DAY_ACTIVITIES; i++) {
                const index = indices[Math.floor(Math.random() * indices.length)]
                if (!selectedIndices.hasOwnProperty(index)) {
                    solution[index] = maxDay + 1
                    selectedIndices[index] = index
                }
            }
        }
    }
    return solution.join('')
}

const down = solution => {
    const indices = []
    const days = []
    solution = solution.split('') // clone the argument
    for (let i = 0; i < solution.length; i++) {
        if (Number(solution[i])) {
            indices.push(i)
            days.push(solution[i])
        }
    }
    if (indices.length) {
        const index = indices[Math.floor(Math.random() * indices.length)]
        //flip a coin to decide whether to remove an entire day
        if (!days.length || Math.random() < DAY_PROBABILITY) {
            solution[index] = 0
        }
        else {
            // remove an entire day
            const selectedDay = days[Math.floor(Math.random() * days.length)]
            for (let i = 0; i < solution.length; i++) {
                if (Number(solution[i]) == selectedDay) {
                    solution[i] = 0
                }
            }
        }
    }
    return solution.join('')
}

const replace = solution => {
    const indices = []
    const days = []
    solution = solution.split('') // clone the argument
    for (let i = 0; i < solution.length; i++) {
        if (Number(solution[i])) {
            indices.push(i)
            days.push(solution[i])
        }
    }
    if (indices.length) {
        const index = indices[Math.floor(Math.random() * indices.length)]
        //flip a coin to decide whether to remove an entire day
        if (days.length) {
            const selectedDay = days[Math.floor(Math.random() * days.length)]
            solution[index] = selectedDay
        }
    }
    return solution.join('')
}

const neighbor = solution => {
    const rnd = Math.random()
    if (rnd <= 0.5) return replace(solution)
    else if (rnd <= 0.75) return up(solution)
    else return down(solution)
}

const print = solution => {
    const result = {}
    for (let i = 0; i < solution.length; i++) {
        const day = Number(solution[i])
        if (day) {
            result[day] = result[day] || []
            result[day].push(activities[i])
        }
    }
    const prices = Object.values(result).map(arr => arr.reduce((price, obj) => obj.price + price, 0))
    console.log('budget:', BUDGET)
    console.log(
        'spendings (per day):', 
        prices,
        ', balance:',
        BUDGET - prices.reduce((a, b) => a + b, 0)
    )
    console.log(
        'durations (per day):', 
        Object.values(result).map(arr => arr.reduce((duration, obj) => obj.duration + duration + COMMUTE_TIME, 0))
    )

    return result
}

const optimize = () => {
    let sol = up('0'.repeat(activities.length))
    let fsol = fitness(sol)
    let bSol = sol, bfSol = fsol
    let lahc = Array(2).fill(fsol)
    let i = 0, lahcI = 0
    while (fsol > 0 && i < 10000) {
        let newSol = neighbor(sol)
        let newFSol = fitness(newSol)
        // console.log(newFSol, lahc[lahcI % lahc.length])
        if (newFSol < lahc[lahcI % lahc.length] + BACKTRACK_LENGTH) { // allow backtracking
            if (newFSol < lahc[lahcI % lahc.length]) {
                bSol = newSol + ''
                bfSol = newFSol
            }
            sol = newSol
            fsol = newFSol
            lahc[lahcI % lahc.length] = newFSol
            lahcI++
        }
        if (bfSol == 0) break;
        // console.log(fsol, lahc.join(', '))
        i++
    }
    console.log(print(bSol))
    console.log(bSol)
}

optimize()