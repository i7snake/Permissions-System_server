/*
 Navicat Premium Data Transfer

 Source Server         : ServerData
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35)
 Source Host           : localhost:3306
 Source Schema         : personnel_system

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35)
 File Encoding         : 65001

 Date: 15/02/2024 13:37:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `avatar_ibfk_1`(`user_id` ASC) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (17, '518f803e92e5100ce81a3c17350328d5', 'image/jpeg', 52018, 28, '2024-01-17 22:39:24', '2024-01-17 22:39:24');
INSERT INTO `avatar` VALUES (18, '6ca879328839ace75be61c6757224ec5', 'image/png', 17056, 3, '2024-01-17 22:58:30', '2024-01-17 22:58:30');
INSERT INTO `avatar` VALUES (19, '4edc53b8883c26e4644b9da4887324b1', 'image/jpeg', 26399, 2, '2024-01-17 23:01:13', '2024-01-17 23:01:13');
INSERT INTO `avatar` VALUES (24, '32dacc0e4621b05c258e20871daa1840', 'image/jpeg', 49272, 7, '2024-01-18 13:38:09', '2024-01-18 14:30:27');
INSERT INTO `avatar` VALUES (25, 'fc18359ad9656fa51c3aa9e572e37dbe', 'image/jpeg', 15001, 9, '2024-01-18 14:39:59', '2024-01-18 14:39:59');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '招聘业务', '负责招聘相关事务', 2, '2024-01-12 15:53:03', '2024-01-13 10:18:42');
INSERT INTO `category` VALUES (2, '绩效业务', '负责绩效相关事务', 2, '2024-01-12 15:54:46', '2024-01-13 10:18:47');
INSERT INTO `category` VALUES (3, '离职业务', '负责离职相关事务', 2, '2024-01-12 15:55:34', '2024-01-13 18:46:44');
INSERT INTO `category` VALUES (17, '培训业务', '负责员工培训相关事务', 2, '2024-01-16 11:39:57', '2024-01-16 11:39:57');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (21, '<p>各位同事注意，请假必须按照公司流程！必须按照公司流程！否则，按照公司规章制度进行处罚。注意点哦</p>', 7, '2024-01-09 13:22:41', '2024-01-11 20:49:03');
INSERT INTO `chat` VALUES (29, '<p><span style=\"font-family: 楷体;\">各位好，本周五进行组织团建。地点：</span><span style=\"color: rgb(0, 58, 140); font-family: 楷体;\">大厦酒店 </span><span style=\"font-family: 楷体;\">时间：</span><span style=\"color: rgb(0, 58, 140); font-family: 楷体;\">9：40。</span><span style=\"font-family: 楷体;\">本次团建自愿参加，请大家积极参与。</span></p>', 9, '2024-01-09 17:26:04', '2024-01-09 17:30:38');
INSERT INTO `chat` VALUES (30, '<p>各位同事新年好！😁😁😁</p>', 9, '2024-01-09 17:43:04', '2024-01-09 17:43:04');
INSERT INTO `chat` VALUES (36, '<h4>最新通知：</h4><p style=\"text-indent: 2em;\">年底将近，公司业务繁忙。请各位同事尽快解决手头上的事务，回家过个好年！新年快乐！</p>', 28, '2024-01-12 11:17:26', '2024-01-12 11:17:26');
INSERT INTO `chat` VALUES (37, '<h4>关于人事方面：</h4><p style=\"text-indent: 2em;\">各部门注意业务信息，招聘、离职、绩效考核方面的详细要求。</p>', 28, '2024-01-14 16:32:57', '2024-01-14 16:32:57');
INSERT INTO `chat` VALUES (38, '<h4><span style=\"color: rgb(255, 173, 210);\">情谊满满：</span></h4><p style=\"text-indent: 2em;\"><span style=\"color: rgb(255, 173, 210);\">下个月2.9是除夕，加上快过年了，公司决定举办“双喜临门”晚会。各位男女单身人士，可要好好把握机会。</span></p>', 28, '2024-01-16 09:56:06', '2024-01-16 09:56:06');
INSERT INTO `chat` VALUES (39, '<p>各位注意，相关安全负责人严格检测公司安全隐患，防患于未然。</p>', 9, '2024-01-18 14:38:57', '2024-01-18 14:38:57');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chat_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `chat_id`(`chat_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `comment_id`(`comment_id` ASC) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (10, '天不生我李太白，人道万古如长夜！', 30, 7, NULL, '2024-01-10 12:34:38', '2024-01-10 12:34:38');
INSERT INTO `comment` VALUES (24, '6', 30, 28, 10, '2024-01-11 17:46:20', '2024-01-11 17:46:20');
INSERT INTO `comment` VALUES (25, '待会给你梆梆两锤', 30, 9, 10, '2024-01-11 17:47:41', '2024-01-11 17:47:41');
INSERT INTO `comment` VALUES (32, '周末不团建！', 29, 7, NULL, '2024-01-11 17:59:22', '2024-01-11 17:59:22');
INSERT INTO `comment` VALUES (34, '强子，我要吃鱼', 30, 7, 25, '2024-01-11 20:18:11', '2024-01-11 20:18:11');
INSERT INTO `comment` VALUES (35, '哈哈哈哈', 30, 7, 24, '2024-01-11 20:46:11', '2024-01-11 20:46:11');
INSERT INTO `comment` VALUES (36, '对，都要按流程进行', 21, 28, NULL, '2024-01-12 11:15:19', '2024-01-12 11:15:19');
INSERT INTO `comment` VALUES (37, '你小子，踢出群聊！', 29, 28, 32, '2024-01-13 20:20:18', '2024-01-13 20:20:18');
INSERT INTO `comment` VALUES (38, '收到！boss！', 37, 7, NULL, '2024-01-18 21:27:51', '2024-01-18 21:27:51');
INSERT INTO `comment` VALUES (39, '收到！', 37, 9, NULL, '2024-01-18 22:07:26', '2024-01-18 22:07:26');
INSERT INTO `comment` VALUES (41, '做好监督。', 37, 28, 39, '2024-01-19 11:14:14', '2024-01-19 11:14:14');
INSERT INTO `comment` VALUES (42, '快快准备吧！', 38, 28, NULL, '2024-01-19 13:29:42', '2024-01-19 13:29:42');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `departmentId` int NOT NULL AUTO_INCREMENT,
  `leader` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parentId` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`departmentId`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (2, 'lihua', '研发部', 9, '2023-12-22 15:16:24', '2024-01-02 20:04:58');
INSERT INTO `department` VALUES (3, 'xiaoming', '运营部', 9, '2023-12-22 15:17:28', '2024-01-02 20:05:00');
INSERT INTO `department` VALUES (4, 'zhangsan', '测试部', 9, '2023-12-22 15:18:06', '2024-01-02 20:05:01');
INSERT INTO `department` VALUES (5, 'HR', '人事部', 9, '2023-12-22 15:18:40', '2024-01-02 20:05:02');
INSERT INTO `department` VALUES (6, 'lisi', '客服部', 2, '2023-12-22 15:19:57', '2023-12-22 15:19:57');
INSERT INTO `department` VALUES (7, 'wangwu', '技术部', 2, '2023-12-22 15:20:16', '2023-12-22 15:20:18');
INSERT INTO `department` VALUES (9, 'hukun', '董事会', NULL, '2024-01-02 20:04:54', '2024-01-02 20:04:54');
INSERT INTO `department` VALUES (11, 'xiaogao', '财务部', 5, '2024-01-03 15:48:25', '2024-01-05 18:12:58');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `menuId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` int NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT NULL,
  `parentId` int NULL DEFAULT NULL,
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '系统总览', 1, 'el-icon-monitor', 1, NULL, '/main/analysis', NULL, '2023-12-22 14:11:34', '2023-12-22 14:11:34');
INSERT INTO `menu` VALUES (2, '系统管理', 1, 'el-icon-setting', 2, NULL, '/main/system', NULL, '2023-12-22 14:12:11', '2023-12-22 14:12:27');
INSERT INTO `menu` VALUES (3, '系统业务', 1, 'el-icon-memo', 3, NULL, '/main/business', NULL, '2023-12-22 14:24:33', '2023-12-22 14:26:31');
INSERT INTO `menu` VALUES (4, '人员沟通', 1, 'el-icon-chat-line-round', 4, NULL, '/main/story', NULL, '2023-12-22 14:27:43', '2023-12-27 22:43:06');
INSERT INTO `menu` VALUES (5, '核心技术', 2, NULL, 5, 1, '/main/analysis/overview', NULL, '2023-12-22 14:41:40', '2023-12-22 14:41:40');
INSERT INTO `menu` VALUES (6, '业务介绍', 2, NULL, 6, 1, '/main/analysis/introduce', NULL, '2023-12-22 14:44:29', '2023-12-22 14:44:29');
INSERT INTO `menu` VALUES (7, '用户管理', 2, NULL, 7, 2, '/main/system/user', NULL, '2023-12-22 14:46:33', '2023-12-22 14:46:33');
INSERT INTO `menu` VALUES (8, '部门管理', 2, NULL, 8, 2, '/main/system/department', NULL, '2023-12-22 14:46:58', '2023-12-22 14:46:58');
INSERT INTO `menu` VALUES (9, '菜单管理', 2, NULL, 9, 2, '/main/system/menu', NULL, '2023-12-22 14:47:22', '2023-12-22 14:47:22');
INSERT INTO `menu` VALUES (10, '角色管理', 2, NULL, 10, 2, '/main/system/role', NULL, '2023-12-22 14:48:19', '2023-12-22 14:48:19');
INSERT INTO `menu` VALUES (11, '业务类别', 2, NULL, 11, 3, '/main/business/category', NULL, '2023-12-22 14:50:04', '2023-12-22 14:50:46');
INSERT INTO `menu` VALUES (12, '业务信息', 2, NULL, 12, 3, '/main/business/message', NULL, '2023-12-22 14:50:42', '2023-12-22 14:51:43');
INSERT INTO `menu` VALUES (13, '动态发布', 2, NULL, 13, 4, '/main/story/chat', NULL, '2023-12-22 14:55:50', '2024-01-08 09:42:56');
INSERT INTO `menu` VALUES (14, '动态列表', 2, NULL, 14, 4, '/main/story/list', NULL, '2023-12-22 14:56:38', '2023-12-22 14:56:38');
INSERT INTO `menu` VALUES (15, '创建用户', 3, NULL, NULL, 7, NULL, 'system:users:create', '2023-12-23 16:32:16', '2023-12-23 16:32:16');
INSERT INTO `menu` VALUES (16, '删除用户', 3, NULL, NULL, 7, NULL, 'system:users:delete', '2023-12-23 16:32:55', '2023-12-23 16:32:55');
INSERT INTO `menu` VALUES (17, '修改用户', 3, NULL, NULL, 7, NULL, 'system:users:update', '2023-12-23 16:33:23', '2023-12-23 16:33:23');
INSERT INTO `menu` VALUES (18, '查询用户', 3, NULL, NULL, 7, NULL, 'system:users:query', '2023-12-23 16:33:53', '2023-12-23 16:33:53');
INSERT INTO `menu` VALUES (19, '创建部门', 3, NULL, NULL, 8, NULL, 'system:department:create', '2023-12-23 16:34:29', '2023-12-23 16:34:29');
INSERT INTO `menu` VALUES (20, '删除部门', 3, NULL, NULL, 8, NULL, 'system:department:delete', '2023-12-23 16:34:49', '2023-12-23 16:34:49');
INSERT INTO `menu` VALUES (21, '修改部门', 3, NULL, NULL, 8, NULL, 'system:department:update', '2023-12-23 16:35:19', '2023-12-23 16:35:19');
INSERT INTO `menu` VALUES (22, '查询部门', 3, NULL, NULL, 8, NULL, 'system:department:query', '2023-12-23 16:36:07', '2023-12-23 16:36:07');
INSERT INTO `menu` VALUES (23, '创建菜单', 3, NULL, NULL, 9, NULL, 'system:menu:create', '2023-12-23 16:36:32', '2023-12-23 16:37:18');
INSERT INTO `menu` VALUES (24, '删除菜单', 3, NULL, NULL, 9, NULL, 'system:menu:delete', '2023-12-23 16:37:40', '2023-12-23 16:39:17');
INSERT INTO `menu` VALUES (25, '修改菜单', 3, NULL, NULL, 9, NULL, 'system:menu:update', '2023-12-23 16:38:14', '2023-12-23 16:39:10');
INSERT INTO `menu` VALUES (26, '查询菜单', 3, NULL, NULL, 9, NULL, 'system:menu:query', '2023-12-23 16:39:06', '2023-12-23 16:39:06');
INSERT INTO `menu` VALUES (27, '创建角色', 3, NULL, NULL, 10, NULL, 'system:role:create', '2023-12-23 16:40:18', '2023-12-23 16:40:18');
INSERT INTO `menu` VALUES (28, '删除角色', 3, NULL, NULL, 10, NULL, 'system:role:delete', '2023-12-23 16:40:51', '2023-12-23 16:40:51');
INSERT INTO `menu` VALUES (29, '修改角色', 3, NULL, NULL, 10, NULL, 'system:role:update', '2023-12-23 16:41:15', '2023-12-23 16:41:15');
INSERT INTO `menu` VALUES (30, '查询角色', 3, NULL, NULL, 10, NULL, 'system:role:query', '2023-12-23 16:41:38', '2023-12-23 16:41:38');
INSERT INTO `menu` VALUES (31, '创建类别', 3, NULL, NULL, 11, NULL, 'system:category:create', '2023-12-23 16:43:21', '2023-12-23 16:43:21');
INSERT INTO `menu` VALUES (32, '删除类别', 3, NULL, NULL, 11, NULL, 'system:category:delete', '2023-12-23 16:43:46', '2023-12-23 16:44:22');
INSERT INTO `menu` VALUES (33, '修改类别', 3, NULL, NULL, 11, NULL, 'system:category:update', '2023-12-23 16:43:55', '2023-12-23 16:44:31');
INSERT INTO `menu` VALUES (34, '查询类别', 3, NULL, NULL, 11, NULL, 'system:category:query', '2023-12-23 16:44:08', '2023-12-23 16:44:39');
INSERT INTO `menu` VALUES (35, '创建业务', 3, NULL, NULL, 12, NULL, 'system:message:create', '2023-12-23 16:45:25', '2024-01-13 20:13:03');
INSERT INTO `menu` VALUES (36, '删除业务', 3, NULL, NULL, 12, NULL, 'system:message:delete', '2023-12-23 16:45:38', '2024-01-13 20:13:07');
INSERT INTO `menu` VALUES (37, '修改业务', 3, NULL, NULL, 12, NULL, 'system:message:update', '2023-12-23 16:45:49', '2024-01-13 20:13:10');
INSERT INTO `menu` VALUES (38, '查询业务', 3, NULL, NULL, 12, NULL, 'system:message:query', '2023-12-23 16:46:11', '2024-01-13 20:13:13');
INSERT INTO `menu` VALUES (39, '新建动态', 3, NULL, NULL, 14, NULL, 'system:story:create', '2023-12-23 16:50:56', '2023-12-23 16:53:31');
INSERT INTO `menu` VALUES (40, '删除动态', 3, NULL, NULL, 14, NULL, 'system:story:delete', '2023-12-23 16:51:07', '2023-12-23 16:53:48');
INSERT INTO `menu` VALUES (41, '修改动态', 3, NULL, NULL, 14, NULL, 'system:story:update', '2023-12-23 16:51:23', '2023-12-23 16:54:00');
INSERT INTO `menu` VALUES (42, '查询动态', 3, NULL, NULL, 14, NULL, 'system:story:query', '2023-12-23 16:51:41', '2023-12-23 16:54:02');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `message` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id` ASC) USING BTREE,
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES (2, '招聘信息', '招聘要求：\n1、熟练掌握HTML/HMTL5，css/css3等页面制作技术；\n2、熟练掌握PHP、Javascript脚本编程，能编程实现各种体验良好的页面交互效果；\n3、掌握前端常用开发框架库类Vue,jquery,Bootstracp等，能基于框架写扩展应用；\n4、关注前端领域最新发展，对手机端网页开发、前端自动化构建工具、模块化编程，前端MVC等有所了解和实践；', 1, '2024-01-12 16:46:33', '2024-01-14 14:33:51');
INSERT INTO `messages` VALUES (7, '离职信息', '离职手续办理：\n1.离职申请\n（1）辞职：正式员工需提前30天交书面辞职申请，试用期员工提前3天即可。\n（2）辞退：公司提出辞退员工要有理有据，员工对无故辞退的有问题的可以申请劳动仲裁。\n2.离职审批\n主动辞职的员工，需等待离职审批。一进行离职面谈，面谈后仍坚持辞职，审批通过。\n3.离职交接\n（1）工作交接：与本部门负责人确认交接事项，完成交接工作。\n（2）物资交接：盘点上交行政物资，务必做好交接记录，避免后续麻烦。\n4.离职结算\n（1）财务结算：必须与财务部门核对确认好备用金、未报销款项以及拖欠未付的公司借款、罚金等财务费用。\n（2）薪资结算：公司一次性付清工资，包括基本工资、提成工资、加班费、年休假工资、奖金等，可以要求公司开具薪资证明。', 3, '2024-01-12 21:22:57', '2024-01-14 16:41:23');
INSERT INTO `messages` VALUES (21, '绩效信息', '绩效指标要求：\n1.个人目标:\n（1）代码审查通过率：完成代码审查的百分比，确保代码质量。\n（2）代码性能：通过对关键代码片段的性能分析，确保高效的代码编写。等等\n2. 团队目标:\n（1）项目交付时间：评估项目团队是否能够按时完成项目交付。\n（2）项目利润率：计算项目的实际利润率，与预算进行比较。\n（3）问题解决速度：衡量团队对项目问题的快速响应和解决能力。\n3. 评估标准:\n（1）工作质量：通过错误率、客户投诉率等指标评估工作质量。\n（2）工作效率：衡量任务完成所需的时间和资源。\n（3）创新能力：根据员工提出的创新性想法和解决方案。\n4. 奖惩机制:\n（1）销售提成：按照销售额的百分比提供奖励。\n（2）项目奖金：根据项目的利润率提供奖励。\n（3）表现优异员工月度奖：每月评选表现优异的员工，提供额外奖励。\n5. 定期审查:\n（1）月度/季度绩效评估会议：定期评估员工的绩效，讨论目标达成情况和改进机会。\n（2）持续培训计划：根据绩效评估结果制定个性化的培训计划。', 2, '2024-01-14 16:24:55', '2024-01-14 16:42:30');
INSERT INTO `messages` VALUES (22, '培训信息', '培训内容及要求：\n一、内容\n1.基础编程语法： 数据类型、循环、条件语句等基础编程概念。\n2.面向对象编程： 类、对象、继承、多态等面向对象编程的基础知识。\n3.Web开发基础： HTML、CSS、JavaScript等前端开发的基础知识。\n4.后端开发： 服务器端语言（如Node.js、Django、Flask等）和框架的学习。\n5.数据库： SQL语法、数据库设计原则、常见数据库系统的使用。\n6.软件设计原则： SOLID原则、设计模式等软件设计的基本概念。\n7.安全性： 常见的安全漏洞、加密技术、安全编程实践。\n8.性能优化： 代码优化、数据库查询优化、缓存等性能优化的方法。\n二、要求\n1.实际项目经验： 提供实际项目的练习和案例，使开发者能够将所学知识应用到实际中。\n2.自主学习能力： 强调培养开发者的自主学习能力，因为技术不断更新，持续学习是程序开发者的重要素质。\n3.团队合作技能： 培养开发者良好的团队协作和沟通能力，包括使用协同工具、参与代码评审等。\n4.项目管理和版本控制： 学习使用项目管理工具和版本控制系统，如Git，以便更好地管理项目和协同开发。', 17, '2024-01-16 11:44:00', '2024-01-16 11:44:00');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `intro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '管理人员', '全部权限', '2023-12-22 15:04:07', '2023-12-22 15:07:46');
INSERT INTO `role` VALUES (2, '技术人员', '核心权限', '2023-12-22 15:04:50', '2023-12-22 15:04:50');
INSERT INTO `role` VALUES (3, '人事人员', '人事管理', '2023-12-22 15:05:59', '2023-12-22 15:05:59');
INSERT INTO `role` VALUES (4, '运营人员', '日常管理', '2023-12-22 15:06:32', '2023-12-22 15:06:32');
INSERT INTO `role` VALUES (18, '按钮测试', '按钮权限', '2024-01-11 16:33:51', '2024-01-11 16:33:51');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `role_id` int NULL DEFAULT NULL,
  `menu_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `menu_id`(`menu_id` ASC) USING BTREE,
  CONSTRAINT `role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menuId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, '2023-12-22 19:46:33', '2023-12-22 19:46:33');
INSERT INTO `role_menu` VALUES (1, 2, '2023-12-22 19:46:53', '2023-12-22 19:46:53');
INSERT INTO `role_menu` VALUES (1, 3, '2023-12-22 19:47:08', '2023-12-22 19:47:08');
INSERT INTO `role_menu` VALUES (1, 4, '2023-12-22 19:47:27', '2023-12-22 19:47:27');
INSERT INTO `role_menu` VALUES (2, 2, '2023-12-22 19:49:23', '2023-12-22 19:49:23');
INSERT INTO `role_menu` VALUES (1, 5, '2023-12-27 15:54:51', '2023-12-27 15:54:51');
INSERT INTO `role_menu` VALUES (1, 6, '2023-12-27 15:54:58', '2023-12-27 15:54:58');
INSERT INTO `role_menu` VALUES (1, 7, '2023-12-27 15:55:08', '2023-12-27 15:55:08');
INSERT INTO `role_menu` VALUES (1, 8, '2023-12-27 15:56:01', '2023-12-27 15:56:01');
INSERT INTO `role_menu` VALUES (1, 9, '2023-12-27 15:56:28', '2023-12-27 15:56:28');
INSERT INTO `role_menu` VALUES (1, 10, '2023-12-27 15:56:28', '2023-12-27 15:56:28');
INSERT INTO `role_menu` VALUES (1, 11, '2023-12-27 15:56:28', '2023-12-27 15:56:28');
INSERT INTO `role_menu` VALUES (1, 12, '2023-12-27 15:56:28', '2023-12-27 15:56:28');
INSERT INTO `role_menu` VALUES (1, 13, '2023-12-27 15:56:28', '2023-12-27 15:56:28');
INSERT INTO `role_menu` VALUES (1, 14, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 15, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 16, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 17, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 18, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 19, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 20, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 21, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 22, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 23, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 24, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 25, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 26, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 27, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 28, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 29, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 30, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 31, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 32, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 33, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 34, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 35, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 36, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 37, '2023-12-27 16:19:21', '2023-12-27 16:19:21');
INSERT INTO `role_menu` VALUES (1, 38, '2023-12-27 16:20:33', '2023-12-27 16:20:33');
INSERT INTO `role_menu` VALUES (1, 39, '2023-12-27 16:20:33', '2023-12-27 16:20:33');
INSERT INTO `role_menu` VALUES (1, 40, '2023-12-27 16:20:33', '2023-12-27 16:20:33');
INSERT INTO `role_menu` VALUES (1, 41, '2023-12-27 16:20:33', '2023-12-27 16:20:33');
INSERT INTO `role_menu` VALUES (1, 42, '2023-12-27 16:20:33', '2023-12-27 16:20:33');
INSERT INTO `role_menu` VALUES (2, 7, '2023-12-27 17:01:13', '2023-12-27 17:01:13');
INSERT INTO `role_menu` VALUES (2, 8, '2023-12-27 17:01:13', '2023-12-27 17:01:13');
INSERT INTO `role_menu` VALUES (2, 9, '2023-12-27 17:01:13', '2023-12-27 17:01:13');
INSERT INTO `role_menu` VALUES (2, 10, '2023-12-27 17:01:13', '2023-12-27 17:01:13');
INSERT INTO `role_menu` VALUES (2, 15, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 16, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 17, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 18, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 19, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 20, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 21, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 22, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 23, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 24, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 25, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 26, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 27, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 28, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 29, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (2, 30, '2023-12-27 17:04:05', '2023-12-27 17:04:05');
INSERT INTO `role_menu` VALUES (18, 16, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 18, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 19, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 21, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 29, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 30, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 2, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 7, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 8, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (18, 10, '2024-01-11 16:33:52', '2024-01-11 16:33:52');
INSERT INTO `role_menu` VALUES (3, 2, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 7, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 15, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 16, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 17, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 18, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 8, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 19, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 20, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 21, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 22, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 9, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 23, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 24, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 25, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 26, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 10, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 27, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 28, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 29, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 30, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 3, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 11, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 31, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 32, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 33, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 34, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 12, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 35, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 36, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 37, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (3, 38, '2024-01-12 16:39:55', '2024-01-12 16:39:55');
INSERT INTO `role_menu` VALUES (4, 1, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 5, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 6, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 4, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 13, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 14, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 39, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 40, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 41, '2024-01-12 16:40:20', '2024-01-12 16:40:20');
INSERT INTO `role_menu` VALUES (4, 42, '2024-01-12 16:40:20', '2024-01-12 16:40:20');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `realname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cellphone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `enable` int NULL DEFAULT 1,
  `departmentId` int NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  INDEX `departmentId`(`departmentId` ASC) USING BTREE,
  INDEX `roleId`(`roleId` ASC) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 'demohu', 'HR', 'e10adc3949ba59abbe56e057f20f883e', '12345678911', 1, 5, 3, 'http://127.0.0.1:8000/file/users/avatar/2', '2023-12-22 20:06:28', '2024-01-17 23:01:13');
INSERT INTO `user` VALUES (3, 'coderhu', '码农', 'e10adc3949ba59abbe56e057f20f883e', '66666666666', 1, 2, 2, 'http://127.0.0.1:8000/file/users/avatar/3', '2023-12-23 14:41:51', '2024-01-17 22:58:30');
INSERT INTO `user` VALUES (7, 'hello', '李白', 'e10adc3949ba59abbe56e057f20f883e', '1111111111', 1, 3, 4, 'http://127.0.0.1:8000/file/users/avatar/7?timestamp=1705559427601', '2023-12-31 21:26:48', '2024-01-18 14:30:27');
INSERT INTO `user` VALUES (8, 'world', '笑笑', 'e10adc3949ba59abbe56e057f20f883e', '19399653214', 1, 2, 2, NULL, '2023-12-31 21:32:18', '2024-01-01 15:12:38');
INSERT INTO `user` VALUES (9, 'javagao', '高启强', 'e10adc3949ba59abbe56e057f20f883e', '19399659965', 1, 3, 4, 'http://127.0.0.1:8000/file/users/avatar/9?timestamp=1705559999030', '2023-12-31 21:34:24', '2024-01-18 14:39:59');
INSERT INTO `user` VALUES (10, 'ababab', '杜甫', 'e10adc3949ba59abbe56e057f20f883e', '121212121212', 1, 7, 2, NULL, '2023-12-31 21:52:48', '2024-01-01 15:12:41');
INSERT INTO `user` VALUES (28, 'admin', '胡坤', 'e10adc3949ba59abbe56e057f20f883e', '19321579965', 1, 9, 1, 'http://127.0.0.1:8000/file/users/avatar/28', '2024-01-03 14:35:39', '2024-01-17 22:39:24');
INSERT INTO `user` VALUES (30, 'button', '按钮', 'e10adc3949ba59abbe56e057f20f883e', '112223334455', 1, 4, 18, NULL, '2024-01-11 16:35:01', '2024-01-11 16:35:01');

SET FOREIGN_KEY_CHECKS = 1;
