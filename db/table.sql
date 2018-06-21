/**
每日风险次数统计表
 */
CREATE TABLE t_current_risk_count (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  count INT NULL,
  create_time DATE,
  PRIMARY KEY (id));


/**
INSERT INTO t_current_risk_count (type, count, create_time) VALUES ('PASSWORD', '9', '2018-02-27');
INSERT INTO t_current_risk_count (type, count, create_time) VALUES ('IP', '3', '2018-02-27');
INSERT INTO t_current_risk_count (type, count, create_time) VALUES ('CITY', '1', '2018-02-27');
INSERT INTO t_current_risk_count (type, count, create_time) VALUES ('DEVICE', '0', '2018-02-27');

 */

/**
周应用排行统计表
 */
CREATE TABLE t_week_app_count (
  id INT NOT NULL AUTO_INCREMENT,
  app_name VARCHAR(255) NOT NULL,
  count INT NOT NULL ,
  create_time DATE,
  PRIMARY KEY (id)
);

/**
INSERT INTO t_week_app_count (app_name, count, sort, create_time) VALUES ('风险引擎', '10000', '2018-02-26');
INSERT INTO t_week_app_count (app_name, count, sort, create_time) VALUES ('E账通', '9999', '2018-02-26');
INSERT INTO t_week_app_count (app_name, count, sort, create_time) VALUES ('安全通讯录', '8888', '2018-02-26');
INSERT INTO t_week_app_count (app_name, count, sort, create_time) VALUES ('IUIM', '6666', '2018-02-26');

 */

/**
* 周用户访问统计表
* @author : desong.tang
* @param null
* @return : 
*/
CREATE TABLE t_week_user_count (
  id int(11) NOT NULL AUTO_INCREMENT,
  monday_count int(11) DEFAULT '0',
  tuesday_count int(11) DEFAULT '0',
  wensday_count int(11) DEFAULT '0',
  thursday_count int(11) DEFAULT '0',
  friday_count int(11) DEFAULT '0',
  saturday_count int(11) DEFAULT '0',
  sunday_count int(11) DEFAULT '0',
  start_week_time date DEFAULT NULL,
  end_week_time date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
INSERT INTO t_week_user_count (monday_count, tuesday_count, wensday_count, thursday_count, friday_count, saturday_count, sunday_count, start_week_time,end_week_time) VALUES ('88', '76', '32', '17', '80', '20', '10', '2018-02-18','2018-02-24');
INSERT INTO t_week_user_count (monday_count, tuesday_count, wensday_count, thursday_count, friday_count, saturday_count, sunday_count, start_week_time,end_week_time) VALUES ('100', '38', '62', '80', '2', '20', '0', '2018-02-25','2018-03-03');

 */

/**
所有设备统计
 */
CREATE TABLE t_total_device_count(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  count INT,
  PRIMARY KEY (id)
);

/**
INSERT INTO t_total_device_count (name, count) VALUES ('IOS', '325235');
INSERT INTO t_total_device_count (name, count) VALUES ('ANDROID', '32523');
INSERT INTO t_total_device_count (name, count) VALUES ('WinCE', '1131');
INSERT INTO t_total_device_count (name, count) VALUES ('Windows', '124214');
INSERT INTO t_total_device_count (name, count) VALUES ('Mac', '131241');
INSERT INTO t_total_device_count (name, count) VALUES ('Ubuntu', '132');
INSERT INTO t_total_device_count (name, count) VALUES ('Centos', '112');

 */

/**
访问城市分布统计
 */
CREATE TABLE t_access_city_count(
  id INT NOT NULL AUTO_INCREMENT ,
  name VARCHAR(45),
  count INT,
  type INT,
  PRIMARY KEY (id)
);

/**
INSERT INTO t_access_city_count (name, count,type) VALUES ('成都', '412' , 1);
INSERT INTO t_access_city_count (name, count,type) VALUES ('北京', '346' , 1);
INSERT INTO t_access_city_count (name, count,type) VALUES ('上海', '568' , 1);
INSERT INTO t_access_city_count (name, count,type) VALUES ('深圳', '1235' , 1);
INSERT INTO t_access_city_count (name, count,type) VALUES ('广州', '56' , 1);

INSERT INTO t_access_city_count (name, count,type) VALUES ('成都', '3245' , 2);
INSERT INTO t_access_city_count (name, count,type) VALUES ('北京', '3534' , 2);
INSERT INTO t_access_city_count (name, count,type) VALUES ('上海', '4561' , 2);
INSERT INTO t_access_city_count (name, count,type) VALUES ('深圳', '24651' , 2);
INSERT INTO t_access_city_count (name, count,type) VALUES ('广州', '123' , 2);

INSERT INTO t_access_city_count (name, count,type) VALUES ('成都', '31231' , 3);
INSERT INTO t_access_city_count (name, count,type) VALUES ('北京', '31234' , 3);
INSERT INTO t_access_city_count (name, count,type) VALUES ('上海', '34523' , 3);
INSERT INTO t_access_city_count (name, count,type) VALUES ('深圳', '65346' , 3);
INSERT INTO t_access_city_count (name, count,type) VALUES ('广州', '1231' , 3);

 */

/**
访问量今日，近７日，近３０日统计表
 */
CREATE TABLE t_access_result_count(
  id INT NOT NULL AUTO_INCREMENT,
  type INT,
  result BIT,
  count INT,
  time VARCHAR(45),
  PRIMARY KEY (id)
);

/**
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '00:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '01:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '02:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '03:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '04:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '05:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '06:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '07:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '08:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 12523, '09:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 42523, '10:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 523, '11:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 23, '12:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 43, '13:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 2, '14:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 224, '15:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 2353, '16:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 1321, '17:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 23235, '18:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 12415, '19:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 1245, '20:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 125, '21:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 25, '22:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 0, '23:00', 1);

INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '00:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '01:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '02:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '03:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '04:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '05:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '06:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '07:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '08:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 252, '09:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 223, '10:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 23, '11:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 23, '12:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 3, '13:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 2, '14:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 24, '15:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 353, '16:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 321, '17:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 235, '18:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 415, '19:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 45, '20:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 5, '21:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '22:00', 1);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 0, '23:00', 1);

INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 4124, '2018-03-01', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 5234, '2018-03-02', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 53245, '2018-03-03', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 23653, '2018-03-04', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 32536, '2018-03-05', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 53455, '2018-03-06', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (1, 35435, '2018-03-07', 2);


INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 1325, '2018-03-01', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 267, '2018-03-02', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 1653, '2018-03-03', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 2754, '2018-03-04', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 1432, '2018-03-05', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 6423, '2018-03-06', 2);
INSERT INTO t_access_result_count (result, count, time, type) VALUES (0, 521, '2018-03-07', 2);

 */

/**
访问量日统计表
 */
CREATE TABLE t_access_result_count_day(
  id INT NOT NULL AUTO_INCREMENT,
  result BIT,
  count INT,
  time DATE,
  PRIMARY KEY (id)
);

/**
INSERT INTO t_access_result_count_day (result, count, time) VALUES (1, '6480', '2018-03-06');
INSERT INTO t_access_result_count_day (result, count, time) VALUES (0, '1924', '2018-03-06');
INSERT INTO t_access_result_count_day (result, count, time) VALUES (1, '3423', '2018-03-05');
INSERT INTO t_access_result_count_day (result, count, time) VALUES (0, '1357', '2018-03-05');

 */

CREATE TABLE t_rule_ip_risk_count(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  type INT,
  time VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_device_risk_count(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  type INT,
  time VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_city_risk_count(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  type INT,
  time VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_password_risk_count(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  type INT,
  time VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_ip_risk_count_day(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  time DATE,
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_device_risk_count_day(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  time DATE,
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_city_risk_count_day(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  time DATE,
  PRIMARY KEY (id)
);

CREATE TABLE t_rule_password_risk_count_day(
  id INT NOT NULL AUTO_INCREMENT,
  count INT,
  time DATE,
  PRIMARY KEY (id)
);

CREATE TABLE t_user (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  nick_name varchar(255) NOT NULL,
  img_path varchar(255) DEFAULT NULL,
  status varchar(45) DEFAULT 'NORMAL',
  email varchar(255) DEFAULT NULL,
  mobile varchar(45) DEFAULT NULL,
  create_time varchar(45) DEFAULT 'now()',
  type int(11) DEFAULT NULL,
  role_id int(11),
  PRIMARY KEY (id)
);

INSERT INTO t_user VALUES ('admin','69c5fcebaa65b560eaf06c3fbeb481ae44b8d618','Administrator','/images/admin_header.png','NORMAL','admin@chart.com','13540070477','2018-03-19',0 , 1);

CREATE TABLE t_menu (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  path VARCHAR(255) NULL,
  icon VARCHAR(255) NULL,
  has_children BIT NULL,
  type VARCHAR(45) NULL,
  target VARCHAR(10) NULL,
  parent_id INT NULL,
  component VARCHAR(45) NULL ,
  PRIMARY KEY (id),
  KEY fk_t_menu_1_idx (parent_id),
  CONSTRAINT fk_t_menu_1 FOREIGN KEY (parent_id) REFERENCES t_menu (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE t_rule (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  type varchar(255) DEFAULT NULL,
  value int(11) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  message varchar(255) DEFAULT NULL,
  time varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO t_menu (name, path, icon, has_children, type) VALUES ('控制面板', '/dashboard', 'dashboard', 0, 'c');
INSERT INTO t_menu (name, path, icon, has_children , type) VALUES ('风险监控', '', 'bar-chart-o', 1 , 'p');
INSERT INTO t_menu (name, path, icon, has_children, type, parent_id) VALUES ('人机认证', '/risk/man', '', 0, 'c', '2');
INSERT INTO t_menu (name, path, icon, has_children, type, parent_id) VALUES ('规则认证', '/risk/rule', '', 0, 'c', '2');
INSERT INTO t_menu (name, path, icon, has_children, type, parent_id) VALUES ('访问量统计', '/risk/access', '', 0, 'c', '2');
INSERT INTO t_menu (name, path, icon, has_children, type, parent_id) VALUES ('大屏展示', '/big.html', '', 0, 'a', '2');
INSERT INTO t_menu (name, path, icon, has_children,type) VALUES ('规则管理', '/rule-list', 'table', 0,'c');

INSERT INTO t_menu ( name, path, icon, has_children , type) VALUES ('系统管理', '', 'gears', 1 , 'p');
INSERT INTO t_menu (name, path, has_children, parent_id,type) VALUES ('用户管理', '/system/username', 0, '7','c');
INSERT INTO t_menu (name, path, icon, has_children, type, parent_id) VALUES ('角色管理', '/system/role', '', 0, 'c', '7');

CREATE TABLE t_role (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO t_role (name) VALUES ('super');
INSERT INTO t_role (name) VALUES ('admin');
INSERT INTO t_role (name) VALUES ('operator');

CREATE TABLE t_role_menu (
  role_id INT NOT NULL,
  menu_id INT NOT NULL,
  PRIMARY KEY (role_id, menu_id));

INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '1');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '2');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '3');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '4');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '5');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '6');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '7');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '8');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '9');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('1', '10');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('2', '2');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('2', '3');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('2', '4');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('2', '5');
INSERT INTO t_role_menu (role_id, menu_id) VALUES ('2', '1');


-- oracle table T_ACTIVE_TIME_QUANTUM begin
CREATE TABLE T_ACTIVE_TIME_QUANTUM (
ID NUMBER(12) NOT NULL ,
TIME VARCHAR2(10 BYTE) NULL ,
COUNT NUMBER(10) NULL ,
CREATE_TIME DATE NULL ,
PRIMARY KEY (ID)
)
PCTFREE 10
INITRANS 1
STORAGE (
	INITIAL 65536
	NEXT 1048576
	MINEXTENTS 1
	MAXEXTENTS 2147483645
	BUFFER_POOL DEFAULT
)

TABLESPACE bcre
LOGGING
NOCOMPRESS
NOCACHE
;

ALTER TABLE T_ACTIVE_TIME_QUANTUM ADD CHECK (ID IS NOT NULL);

-- oracle table T_IP_PORTRAYAL_COUNT begin

CREATE TABLE T_IP_PORTRAYAL_COUNT (
ID NUMBER(10) NOT NULL ,
USER_IP VARCHAR2(25 BYTE) NULL ,
COUNT NUMBER(10) NULL ,
CREATE_TIME DATE NULL ,
PRIMARY KEY (ID)
)
PCTFREE 10
INITRANS 1
STORAGE (
	INITIAL 65536
	NEXT 1048576
	MINEXTENTS 1
	MAXEXTENTS 2147483645
	BUFFER_POOL DEFAULT
)

TABLESPACE bcre
LOGGING
NOCOMPRESS
NOCACHE
;
ALTER TABLE T_IP_PORTRAYAL_COUNT ADD CHECK (ID IS NOT NULL);

CREATE TABLE T_DYNAMIC_DATA_SOURCE (
  ID INT NOT NULL AUTO_INCREMENT,
  NAME VARCHAR(200) NULL,
  DESCRIPTION VARCHAR(255) NULL,
  STATUS VARCHAR(45) NULL,
  TYPE VARCHAR(45) NULL,
  DRIVER VARCHAR(45) NULL,
  URL VARCHAR(200) NULL,
  USERNAME VARCHAR(200) NULL,
  PASSWORD VARCHAR(200) NULL,
  PROPERTIES VARCHAR(1000) NULL,
  HOST VARCHAR(200) NULL,
  PORT VARCHAR(20) NULL,
  DB_NAME VARCHAR(200) NULL,
  CREATOR VARCHAR2(50),
  CREATE_TIME TIMESTAMP,
  PRIMARY KEY (ID)
);

CREATE TABLE T_DYNAMIC_CHART(
    ID VARCHAR2(50) PRIMARY KEY,
    TYPE VARCHAR2(20),
    STATUS VARCHAR2(20),
    TEXT VARCHAR2(225),
    X_AXIS CLOB,
    Y_AXIS CLOB,
    SERIES CLOB,
    HTML_ID VARCHAR2(50),
    HTML_URL VARCHAR2(255),
    CREATOR VARCHAR2(50),
    CREATE_TIME TIMESTAMP
);

CREATE TABLE T_DYNAMIC_QUERY_SQL(
    ID NUMBER PRIMARY KEY,
    SQL_NAME VARCHAR2(50),
    USED VARCHAR2(255),
    COLUMNS VARCHAR2(500),
    TABLE_NAME VARCHAR2(500),
    CONDITIONS VARCHAR2(500),
    GROUP_BY VARCHAR2(500),
    HAVING_STR VARCHAR2(500),
    ORDER_BY VARCHAR2(100),
    SQL_STR CLOB,
    CHART_ID VARCHAR2(50),
    MODULE VARCHAR2(50),
    DATA_SOURCE_ID NUMBER,
    CREATOR VARCHAR2(50),
    CREATE_TIME TIMESTAMP
);

CREATE SEQUENCE T_DYNAMIC_QUERY_SQL_SEQ
START WITH 1
INCREMENT BY 1;


CREATE SEQUENCE T_DYNAMIC_HTML_SEQ
START WITH 1
INCREMENT BY 1;


CREATE TABLE T_DYNAMIC_HTML(
    ID VARCHAR2(50) PRIMARY KEY,
    CODE CLOB,
    URL VARCHAR2(200),
    PATH VARCHAR2(200)
);

