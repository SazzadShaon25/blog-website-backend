import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt"


const userSchema = new Schema<TUser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        select: 0,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);


userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(12)
    );
    next();
});

userSchema.post('save', function(doc, next){
    doc.password = "";
    next();
});

export const User = model<TUser>('User', userSchema);