import { rng } from "../Classes/RNG";

test('RNG constructor returns non null object', () => {
    const random = new rng(0)
    expect(random).not.toBeNull()
})

test('RNG setSeed works', () => {
    const random = new rng(0)
    random.setSeed(325)

    expect(random.randomInt(325)).toBe(75)
})

test('RNG random only returns [0, 1)', () => {
    const random = new rng(0)

    var nums = []
    for(var i = 0; i < 1000; i++)
        nums.push(random.random())

    expect(nums.every((num) => num >= 0)).toBe(true)
    expect(nums.every((num) => num < 1)).toBe(true)
})

test('RNG randomInt only returns [0, max]', () => {
    const random = new rng(0)
    const max = Math.floor(Math.random() * 25) + 1

    var nums = []
    for(var i = 0; i < 1000; i++)
        nums.push(random.randomInt(max))

    expect(nums.every((num) => num >= 0)).toBe(true)
    expect(nums.every((num) => num <= max)).toBe(true)
})

test('RNG randomRange only returns [min, max)', () => {
    const random = new rng(0)
    const min = Math.floor(Math.random() * 25) + 1
    const max = Math.floor(Math.random() * 100) + 1

    var nums = []
    for(var i = 0; i < 1000; i++)
        nums.push(random.randomRange(min, max))

    expect(nums.every((num) => num >= min)).toBe(true)
    expect(nums.every((num) => num < max)).toBe(true)
})

test('RNG randomRangeInt only returns [min, max]', () => {
    const random = new rng(0)
    const min = Math.floor(Math.random() * 25) + 1
    const max = Math.floor(Math.random() * 100) + 1

    var nums = []
    for(var i = 0; i < 1000; i++)
        nums.push(random.randomRangeInt(min, max))

    expect(nums.every((num) => num >= min)).toBe(true)
    expect(nums.every((num) => num <= max)).toBe(true)
})

test('RNG pickFrom only returns value from given array', () => {
    const random = new rng(0)

    var choice = []
    for(var i = 0; i < 100; i++)
        choice.push(i)

    var nums = []
    for(var i = 0; i < 1000; i++)
        nums.push(random.pickFrom(choice))

    expect(nums.every((num) => num >= 0)).toBe(true)
    expect(nums.every((num) => num < 100)).toBe(true) 
})