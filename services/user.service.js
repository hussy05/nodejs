// Package Imports

// Local Imports
const { log } = require("util");
const { db } = require("../database");
const { catchError } = require("../utils");

class UserService {
  // Get All
  static getAll = async () =>
    await catchError(async () => {
      const result = await db.Users.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (result) return { result };
      else throw new Error();
    });

  static getByColumn = async (columnName, columnValue) =>
    await catchError(async () => {
      const result = await db.Users.findAll({
        where: { [columnName]: columnValue },
        order: [["createdAt", "DESC"]],
      });
      if (result.length === 0) throw new Error("Email not found")
      if (result) return { result };
      else throw new Error();
    });
  
    static getByClientAndRole = async (clientId,role) =>
      await catchError(async () => {
        const result = await db.Users.findAll({
          where: {'clientId':clientId,'role':role },
          order: [["createdAt", "DESC"]],
        });
        if (result.length === 0) throw new Error("Email not found")
        if (result) return { result };
        else throw new Error();
    });
    static getByRole = async (role) =>
      await catchError(async () => {
        const result = await db.Users.findAll({
          where: {'role':role },
          order: [["createdAt", "DESC"]],
        });
        if (result.length === 0) throw new Error("Not found")
        if (result) return { result };
        else throw new Error();
    });
  static getByEmailRole = async (email,role,clientId) =>
      await catchError(async () => {
          let whereClause = {};

          if (email) {
              whereClause.email = email;
          }

          if (role) {
              whereClause.role = role;
          }

          // Check if clientId is provided, and if so, include it in the where clause.
          if (clientId) {
              whereClause.clientId = clientId;
          }

          const result = await db.Users.findAll({
              where: whereClause,
              order: [["createdAt", "DESC"]],
          });

          if (result.length === 0) {
              throw new Error("Not found");
          }

          return { result };
      });


    // Get By Id
    static getById = async (id) =>
      await catchError(async () => {
        const result = await db.Users.findByPk(id, {
          order: [["createdAt", "DESC"]],
      });
      if (result) return { result };
      else throw new Error();
      });

  

  static findByEmail = async (email = "") =>
    await catchError(async () => {
      const result = await db.Users.findOne({ where: { email } });
      if (result) return { result };
      else throw new Error();
    });

  // Create
  static create = async (data) =>
    await catchError(async () => {
      const result = await db.Users.create(data);
        await UserService.update(result.id, { userName: result.id })
      return { result };
    });
    static getByColumnForLogin = async (columnName, columnValue) =>
        await catchError(async () => {
            const result = await db.Users.findAll({
                where: { [columnName]: columnValue },
                order: [["createdAt", "DESC"]],
            });
            if (result.length === 0) throw new Error();
            if (result) return { result };
            else throw new Error();
        });
  // Update
  static update = async (id, data) =>
    await catchError(async () => {
      const affectedRows = await db.Users.update(data, { where: { id } });
      if (affectedRows == 1) return { result: true };
      else throw new Error();
    });

  // Delete
  static delete = async (id) =>
    await catchError(async () => {
      const affectedRows = await db.Users.destroy({ where: { id } });
      if (affectedRows == 1) return { result: true };
      else throw new Error();
    });
};
module.exports = UserService