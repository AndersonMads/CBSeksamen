
CREATE TABLE [DBA].[dbo].[items] (
	id int IDENTITY(1,1) NOT NULL,
	i_name varchar NOT NULL,
	category_id int NOT NULL,
	img image NOT NULL,
	price decimal NOT NULL,
	date_created date NOT NULL DEFAULT(SYSDATETIME()),
	user_id int NOT NULL,
	reusables bit NOT NULL,
	follow bit NOT NULL,
	today_date_id int NOT NULL DEFAULT '1',
  CONSTRAINT [PK_ITEMS] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [DBA].[dbo].[locations] (
	id int IDENTITY(1,1) NOT NULL,
	region varchar NOT NULL,
  CONSTRAINT [PK_LOCATIONS] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [DBA].[dbo].[users] (
	id int IDENTITY(1,1) NOT NULL,
	username varchar NOT NULL UNIQUE,
	pswd varchar NOT NULL,
	adm bit NOT NULL,
	gold bit NOT NULL,
	date_created date NOT NULL DEFAULT(SYSDATETIME()),
	location_id int NOT NULL,
  CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [DBA].[dbo].[categories] (
	id int IDENTITY(1,1) NOT NULL,
	c_name varchar NOT NULL,
  CONSTRAINT [PK_CATEGORIES] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [DBA].[dbo].[today_date] (
	id int NOT NULL DEFAULT '1',
	date_generated date NOT NULL DEFAULT(SYSDATETIME()),
  CONSTRAINT [PK_TODAY_DATE] PRIMARY KEY CLUSTERED
  (
  [id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
ALTER TABLE [items] WITH CHECK ADD CONSTRAINT [items_fk0] FOREIGN KEY ([category_id]) REFERENCES [categories]([id])
ON UPDATE CASCADE
GO
ALTER TABLE [items] CHECK CONSTRAINT [items_fk0]
GO
ALTER TABLE [items] WITH CHECK ADD CONSTRAINT [items_fk1] FOREIGN KEY ([user_id]) REFERENCES [users]([id])
ON UPDATE CASCADE
GO
ALTER TABLE [items] CHECK CONSTRAINT [items_fk1]
GO
ALTER TABLE [items] WITH CHECK ADD CONSTRAINT [items_fk2] FOREIGN KEY ([today_date_id]) REFERENCES [today_date]([id])
ON UPDATE CASCADE
GO
ALTER TABLE [items] CHECK CONSTRAINT [items_fk2]
GO


ALTER TABLE [users] WITH CHECK ADD CONSTRAINT [users_fk0] FOREIGN KEY ([location_id]) REFERENCES [locations]([id])
ON UPDATE CASCADE
GO
ALTER TABLE [users] CHECK CONSTRAINT [users_fk0]
GO


