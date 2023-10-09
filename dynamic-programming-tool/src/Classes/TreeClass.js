let nodeCounter = 0
// T R E E   N O D E ====================================================================
class TreeNode{
    constructor(value){
        this.ID = nodeCounter
        nodeCounter++
        this.value = value
        this.parent = null
        this.children = []
    }

    //Node[parentID] gets new child newNode
    insertByID(parentID, node){
        if (this.ID === parentID){
            node.parent = this
            this.children.push(node)
        }

        if (this.children.length > 0)
            for(let childNode of this.children)
                childNode.insertByID(parentID, node)
            
    }
    
    //Node w/ value = parentVal gets new child newNode
    insertByVal(parentVal, node){
        if (this.value === parentVal){
            node.parent = this
            this.children.push(node)
        }
    
        if (this.children.length > 0)
            for(let childNode of this.children)
                childNode.insertByVal(parentVal, node)
            
    }

    //Traverses tree using BFS and prints curr node ID
    preOrderID(){
        console.log(this.ID)

        for(let childNode of this.children)
            childNode.preOrderID()
    }
    
    //Traverses tree using BFS and prints curr node value
    preOrderVal(){
        console.log(this.value)

        for(let childNode of this.children)
            childNode.preOrderVal()
    }

    //Looks for a node w/ value = searchVal, if found return T else return F
    containsNodeVal(searchVal){
        if (this.value === searchVal)
            return true

        if (this.children.length > 0)
            for(let childNode of this.children)
                if (childNode.containsNodeVal(searchVal))
                    return true

        return false
    }

    //Writes tree as a str, can use to check ans is correct
    serializeTree(){
        if (!this)
            return ''

        let serializedStr = String(this.value)
        if (this.children.length > 0){
            serializedStr += '(' + this.children.map(function(childNode) {
                return childNode.serializeTree()
            }).join(',') + ')'
        }

        return serializedStr

    }
}

// T R E E ==============================================================================
class Tree{
    constructor(value){
        this.root = new TreeNode(value)
    }

    //Adds node as child of root node
    insert(node){
        node.parent = this.root
        this.root.children.push(node)
    }

    //Node[parentID] gets new child newNode
    insertByID(parentID, node){
        if (nodeCounter > parentID)
            this.root.insertByID(parentID, node)
    }

    //Node w/ value = parentVal gets new child newNode
    insertByVal(parentVal, node){
        if (this.root.containsNodeVal(parentVal))
            this.root.insertByVal(parentVal, node)
    }
}

// export { Tree, TreeNode }

let tree = new Tree(8)
tree.insertByID(0, new TreeNode(5))
tree.insertByID(0, new TreeNode(3))
tree.insertByID(1, new TreeNode(2))
tree.insertByID(1, new TreeNode(3))
tree.insertByID(3, new TreeNode(1))
tree.insertByID(3, new TreeNode(1))

console.log(tree.root.serializeTree())