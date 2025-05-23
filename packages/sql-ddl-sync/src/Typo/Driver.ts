import { IDbDriver } from "@fxjs/db-driver";
import { FxOrmCoreCallbackNS } from "@fxjs/orm-core";
import { IProperty } from "@fxjs/orm-property";

import { FxOrmSqlDDLSync__Dialect } from "./Dialect";
import { FxOrmSqlDDLSync__DbIndex } from "./DbIndex";

export namespace FxOrmSqlDDLSync__Driver {
    export interface CustomPropertyType<T extends IDbDriver.IConnTypeEnum = IDbDriver.IConnTypeEnum> {
        datastoreType(
            prop?: IProperty,
            opts?: {
                collection: string
                driver: IDbDriver<T>
            }
        ): string
        valueToProperty?(value?: any, prop?: any): any
        propertyToValue?(value?: any, prop?: any): any

        [ext_cfg_name: string]: any
    }

    /**
     * @description one protocol driver should implement
     */    
    export interface Driver<T extends IDbDriver.IConnTypeEnum> extends IDbDriver<T> {
        dialect: FxOrmSqlDDLSync__Dialect.DialectType

        /**
         * @description sync table/collection
         */
        sync: {
            <T = any>(): T
            <T = any>(cb: FxOrmCoreCallbackNS.ExecutionCallback<T>): void
        }
        
        /**
         * @description drop table/collection
         */
        drop: {
            <T = any>(): T
            <T = any>(cb: FxOrmCoreCallbackNS.ExecutionCallback<T>): void
        }

        customTypes?: {
            [type_name: string]: CustomPropertyType<T>
        }
    }

    export interface DbIndexInfo_MySQL extends FxOrmSqlDDLSync__DbIndex.DbIndexInfo {
        index_name: string
        column_name: string

        non_unique: number|boolean
    }

    export interface DbIndexInfo_PostgreSQL extends FxOrmSqlDDLSync__DbIndex.DbIndexInfo {
        indisprimary: "1" | "0" | boolean
        indisunique: "1" | "0" | boolean
        relname: string
        attname: string
    }

    export interface DbIndexInfo_SQLite extends FxOrmSqlDDLSync__DbIndex.DbIndexInfo {
        unique: boolean
    }
}