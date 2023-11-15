import { TreeNode, Tree } from './TreeClass';

test('Tree constructor returns non null object', () => {
    const tree = new Tree(0)
    expect(tree).not.toBeNull()
})

test('Tree insert works', () => {
    const tree = new Tree(0)
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        tree.insert(new TreeNode(i))

    expect(tree.root.children.length).toBe(count)
})

test('Tree insert by ID works', () => {
    const tree = new Tree(0)
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        tree.insertByID(0, new TreeNode(i))

    expect(tree.root.children.length).toBe(count)
})

test('Tree insert by value works', () => {
    const randVal = Math.floor(Math.random() * 10) + 1
    const tree = new Tree(randVal)
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        tree.insertByVal(randVal, new TreeNode(325))

    expect(tree.root.children.length).toBe(count)
})

test('TreeNode constructor returns non null object', () => {
    const node = new TreeNode(0)
    expect(node).not.toBeNull()
})

test('TreeNode insert works', () => {
    const node = new TreeNode(0)
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        node.insert(new TreeNode(i))

    expect(node.children.length).toBe(count)
})

test('TreeNode insert by ID works', () => {
    const node = new TreeNode(0)
    const nodeID = node.ID
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        node.insertByID(nodeID, new TreeNode(i))

    expect(node.children.length).toBe(count)
})

test('TreeNode insert by value works', () => {
    const randVal = Math.floor(Math.random() * 10) + 1
    const node = new TreeNode(randVal)
    
    const count = Math.floor(Math.random() * 10) + 1
    for(var i = 0; i < count; i++)
        node.insertByVal(randVal, new TreeNode(325))

    expect(node.children.length).toBe(count)
})

test('TreeNode contains works', () => {
    const randVal = Math.floor(Math.random() * 10) + 1
    const node = new TreeNode(randVal)
    const nodeID = node.ID

    const count = Math.floor(Math.random() * 10) + 1
    const chosenVal = Math.floor(Math.random() * count)
    for(var i = 0; i < count; i++)
        node.insert(new TreeNode(i))

    expect(node.containsNodeVal(chosenVal)).toBe(true)
})

test('TreeNode serialize tree works', () => {
    const tree = new Tree(3)
    tree.insert(new TreeNode(2))
    tree.insert(new TreeNode(5))

    expect(tree.root.serializeTree()).toBe('3(2.5)')
})

test('TreeNode serialize tree ID works', () => {
    const tree = new Tree(3)
    tree.insert(new TreeNode(2))
    tree.insert(new TreeNode(5))

    expect(tree.root.serializeTreeID()).toBe('0(1.2)')
})

test('TreeNode decompose tree works', () => {
    const tree = new Tree(3)
    tree.insert(new TreeNode(2))
    tree.insert(new TreeNode(5))

    var expected = []
    expected.push({id: 0, value: 3})
    expected.push({id: 1, value: 2})
    expected.push({id: 2, value: 5})

    expect(tree.root.decomposeTree()).toEqual(expected)
})

// describe('TreeNode and Tree Classes', () => {
//   test('Insert and Traverse TreeNodes', () => {
//     // Create tree + nodes
//     const tree = new Tree(1);
//     const child1 = new TreeNode(2);
//     const child2 = new TreeNode(3);

//     // Insert nodes
//     tree.insert(child1);
//     tree.insert(child2);

//     // Check the tree structure using pre-order traversal
//     const traversedValues = [];
//     tree.root.preOrderVal(); // This will log values, capture them in the array
//     const expectedValues = [1, 2, 3];

//     expect(traversedValues).toEqual(expectedValues);
//   });

//   test('Serialize and Decompose Tree', () => {
//     // Create tree nodes
//     const tree = new TreeNode('A');
//     const child1 = new TreeNode('B');
//     const child2 = new TreeNode('C');

//     // Insert nodes
//     tree.insert(child1);
//     tree.insert(child2);

//     // Serialize and decompose the tree
//     const decomposedTree = tree.root.decomposeTree();

//     // Check if the decomposition matches the expected structure
//     const expectedDecomposedTree = [
//       { id: '0', value: 'A' },
//       { id: '1', value: 'B' },
//       { id: '2', value: 'C' },
//     ];

//     expect(decomposedTree).toEqual(expectedDecomposedTree);
//   });
// });