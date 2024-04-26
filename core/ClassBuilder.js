const Core = require("./Core");
class ClassBuilder extends Core.ClassBuilder{

    static createClassNode(stack, ctx, type) {
        const obj = new ClassBuilder(stack, ctx, type);
        return obj.create();
    }

    createClassMemeberNode( memeberStack ){
        const node = this.createToken(memeberStack);
        if(node){
            this.builder.createMemeberRoute(memeberStack)
        }
        return node;
    }

}
module.exports = ClassBuilder;