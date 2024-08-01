CREATE table types(
	type VARCHAR(6) PRIMARY KEY
)

INSERT into types(type) VALUES
('BUYER'),
('SELLER'),
('ADMIN')

CREATE table personnel(
	type VARCHAR(6) References types(type),
	interest text,
	preferred_location VARCHAR(20),
	username VARCHAR(20) NOT NULL PRIMARY KEY,
	hash text NOT NULL,
	email VARCHAR(50) NOT NULL
)

CREATE table statuses(
	status VARCHAR(9) PRIMARY KEY
)

INSERT INTO statuses(status) VALUES
('SOLD'),
('AVAILABLE')
	
CREATE table item (
	description text,
	buy_price numeric (9,2),
	sell_price numeric(9,2) NOT NULL,
	item_uuid uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	item_name VARCHAR(20) NOT NULL,
	status VARCHAR(9) NOT NULL References statuses(status),
	seller_username VARCHAR(20) NOT NULL references personnel(username),
	buyer_username VARCHAR(20) references personnel(username)
)

CREATE table personnel_chat(
	chat_table_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	item_uuid uuid NOT NULL references item(item_uuid),
	text_content text NOT NULL,
	from_who VARCHAR(20) NOT NULL references personnel(username),
	to_who VARCHAR(20) NOT NULL references personnel(username),
	timestamp timestamp NOT NULL
)

-- from buyer to seller query only
SELECT * FROM personnel
JOIN personnel_chat ON 
(personnel.username = personnel_chat.from_who AND personnel.username = personnel_chat.to_who)
JOIN item ON personnel_chat.item_uuid = item.item_uuid
WHERE item.uuid = "actual uuid here" 
AND personnel_chat.from_who=item.buyer_username AND personnel_chat.to_who=item.seller_username

-- from seller to buyer query only
SELECT * FROM personnel
JOIN personnel_chat ON 
(personnel.username = personnel_chat.from_who AND personnel.username = personnel_chat.to_who)
JOIN item ON personnel_chat.item_uuid = item.item_uuid
WHERE item.uuid = "actual uuid here" 
AND personnel_chat.from_who=item.seller_username AND personnel_chat.to_who=item.buyer_username

SELECT DISTINCT ON (item_uuid) *
FROM public.personnel_chat
WHERE from_who = 'iAMBUYER' OR to_who = 'iAMBUYER'
ORDER BY item_uuid, chat_table_id ASC;

SELECT pc.chat_table_id, pc.text_content, pc.from_who, pc.to_who, i.item_uuid, i.item_name AS item_name, i.description AS item_description, pc.timestamp AS timestamp, i.sell_price AS sell_price, s.status AS status, p_seller.username AS seller_username, p_buyer.username AS buyer_username FROM personnel_chat pc INNER JOIN item i ON pc.item_uuid = i.item_uuid INNER JOIN statuses s ON i.status = s.status INNER JOIN personnel p_seller ON i.seller_username = p_seller.username LEFT JOIN personnel p_buyer ON i.buyer_username = p_buyer.username WHERE i.item_uuid = '0c0b313c-06f6-4847-966b-ed78b31e010e' ORDER BY pc.timestamp ASC;