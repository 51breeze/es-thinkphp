package table;

struct table Person{
  id: int(11) auto_increment,
  pid: int(11) DEFAULT 0,
  account?: varchar(32) DEFAULT '',
  title?: varchar(32),

  PRIMARY KEY(id),
  KEY pid(pid),
  FULLTEXT KEY title(title)
}