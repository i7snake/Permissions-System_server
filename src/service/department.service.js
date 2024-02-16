const connection = require("../app/database");

class DepartmentService {
  async create(name, parentId, leader) {
    const sql = `INSERT INTO department (name,parentId,leader) VALUES (?,?,?);`;
    const [result] = await connection.execute(sql, [name, parentId, leader]);
    return result;
  }
  async change(departmentId, name, parentId, leader) {
    const sql = `UPDATE department SET name = ?,parentId = ?,leader = ? WHERE departmentId = ?;`;
    const [result] = await connection.execute(sql, [
      name,
      parentId,
      leader,
      departmentId,
    ]);
    return result;
  }
  async remove(departmentId) {
    const sql = `DELETE FROM department WHERE departmentId = ?;`;
    const [result] = await connection.execute(sql, [departmentId]);
    return result;
  }
  async getDepartmentId(departmentId) {
    const sql = `SELECT * FROM department WHERE departmentId = ?;`;
    const [result] = await connection.execute(sql, [departmentId]);
    return result;
  }

  // 查询列表
  async getDepartmentList_1(offset, size) {
    // 1.查询部门信息
    let result;
    if (!offset && !size) {
      const [res] = await connection.execute(`SELECT * FROM department;`);
      result = res;
    } else {
      const sql = `SELECT * FROM department LIMIT ? OFFSET ?;`;
      const [res] = await connection.execute(sql, [
        size.toString(),
        offset.toString(),
      ]);
      result = res;
    }

    // 2.在查询部门的时候把父级部门信息一起查询
    const departmentMap = {};
    result.forEach((department) => {
      departmentMap[department.departmentId] = department;
    });

    result.forEach((department) => {
      if (department.parentId !== null) {
        const parentDepartment = departmentMap[department.parentId];
        if (parentDepartment) {
          department.parent = {
            departmentId: parentDepartment.departmentId,
            name: parentDepartment.name,
            leader: parentDepartment.leader,
          };
        }
      }
    });

    const [listLength] = await connection.execute(`SELECT * FROM department`);

    const res = {
      list: result,
      totalCount: listLength.length,
    };
    return res;
  }

  async getDepartmentList_2(offset, size, name, leader) {
    // 1. 查询符合条件的部门信息
    let conditions = [];
    let params = [];

    if (leader !== "") {
      conditions.push("d.leader LIKE ?");
      params.push(`%${leader}%`);
    }

    if (name !== "") {
      conditions.push("d.name LIKE ?");
      params.push(`%${name}%`);
    }

    let whereClause = "";
    if (conditions.length > 0) {
      whereClause = "WHERE " + conditions.join(" OR ");
    }

    const sql = `
      SELECT d.*, p.name AS parent_name, p.leader AS parent_leader
      FROM department d
      LEFT JOIN department p ON d.parentId = p.departmentId
      ${whereClause}
      LIMIT ? OFFSET ?;
    `;

    params.push(size.toString(), offset.toString());
    const [result] = await connection.execute(sql, params);

    // 2. 根据查询结果构建部门列表，包括父级部门信息
    const departmentList = result.map((row) => {
      const department = {
        departmentId: row.departmentId,
        leader: row.leader,
        name: row.name,
        parentId: row.parentId,
        createAt: row.createAt,
        updateAt: row.updateAt,
      };

      // 如果存在父级部门信息，创建 parent 属性
      if (row.parentId !== null) {
        department.parent = {
          departmentId: row.parentId,
          name: row.parent_name,
          leader: row.parent_leader,
        };
      }

      return department;
    });

    const res = {
      list: departmentList,
      totalCount: departmentList.length,
    };
    return res;
  }
}

module.exports = new DepartmentService();
