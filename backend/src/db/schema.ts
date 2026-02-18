
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";


function CreatedAt(){
    return timestamp().defaultNow()
}
function UpdatedAt(){
    return timestamp().defaultNow().$onUpdate(()=> new Date).notNull()
}

export const User = pgTable('user' , {
    id : uuid().defaultRandom().primaryKey(),
    name : text(),
    email : text(),
    emailVerified : boolean().default(false),
    image : text(),
    createdAt : timestamp().defaultNow(),
    updatedAt : timestamp().defaultNow().$onUpdate(()=> new Date).notNull(),

})

export const Session = pgTable('session' , {
    id : uuid().defaultRandom().primaryKey(),
    expiresAt : timestamp().notNull(),
    token : text().notNull(),
    createdAt : timestamp().defaultNow(),
    updatedAt : timestamp().defaultNow().$onUpdate(()=> new Date).notNull(),
    ipAddress : text(),
    userAgent : text(),
    userId : uuid().references(()=>User.id , {onDelete : 'cascade'})
    
})


export const Account = pgTable('account' , {
    id : uuid().defaultRandom().primaryKey(),
    account : text().notNull(),
    providerId :text().notNull(),
    userId : uuid().references(()=>User.id , {onDelete : 'cascade'}),
    accessToken : text(),
    refreshToken : text(),
    idToken : text(),
    accessTokenExpiresAt : timestamp(),
    refreshTokenExpiresAt : timestamp(),
    scope : text(),
    password : text(),
    createdAt : CreatedAt(),
    UpdatedAt : UpdatedAt(),
    
})

export const Verfication = pgTable('verification' , {
    id : uuid().defaultRandom().primaryKey(),
    identifier : text(),
    value : text(),
    expiresAt : timestamp(),
    createdAt : CreatedAt(),
    updatedAt : UpdatedAt()
})


// realtions

export const SessionRelation = relations(Session , ({one , many })=>({

    user : one(User , {
        fields : [Session.userId],
        references : [User.id]
    })
})) 

export const AccountRelation = relations(Account , ({one , many })=>({

    user : one(User , {
        fields : [Account.userId],
        references : [User.id]
    })
})) 

export const UserRelation = relations(User , ({one , many}) =>({

    session : many(Session) , 
    account : one(Account)
}))

