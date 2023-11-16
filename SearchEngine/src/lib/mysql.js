const {PrismaClient} = require('@prisma/client');

/**
 * @class PrismaClientSingleton
 * @description Singleton class for PrismaClient
 * @example const prisma = new PrismaClientSingleton().getPrisma();
 * @return {PrismaClient} prisma
 */
class PrismaClientSingleton {
    /**
     * @constructor
     * @description Creates an instance of PrismaClientSingleton.
     * @memberof PrismaClientSingleton
     * @return {PrismaClientSingleton} instance {if not exists} else {return existing instance}
     */
    constructor() {
        if (!PrismaClientSingleton.instance) {
            this.prisma = new PrismaClient();
            PrismaClientSingleton.instance = this;
        }

        return PrismaClientSingleton.instance;
    }
    /**
     * @method getPrisma
     * @description Returns the prisma instance
     * @return {PrismaClient} prisma
     */
    getPrisma() {
        return this.prisma;
    }
}

module.exports = PrismaClientSingleton;

/**
 * @usage : to use the connection, import the connection given between, if problem, check the path
 * const PrismaClientSingleton = require('./model/mysql');  //check the path if error occurs
 * const prisma = new PrismaClientSingleton().getPrisma();
*/
