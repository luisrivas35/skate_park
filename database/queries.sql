-- Drop the skaters table if it exists
DROP TABLE IF EXISTS skaters;

CREATE TABLE skaters (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    anos_experiencia INTEGER NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado, is_admin)
VALUES
('tony.hawk@example.com', 'tony', '$2b$10$EkCrejtHYXSow5FbquwekOLCIjuHZn6QxoO8q7tRBifuGZxnHZml2', 5, 'Freestyle', 'assets/imgs/tony.jpg', true, false),
('evelien@example.com', 'evelien', '$2b$10$EkCrejtHYXSow5FbquwekOLCIjuHZn6QxoO8q7tRBifuGZxnHZml2', 3, 'Street', 'assets/imgs/evelien.jpg', true, false),
('dany@example.com', 'dany', '$2b$10$EkCrejtHYXSow5FbquwekOLCIjuHZn6QxoO8q7tRBifuGZxnHZml2', 3, 'Jumps', 'assets/imgs/danny.jpg', true, false),
('admin@example.com', 'admin', '$2b$10$rQr6k/U.SA/Jj46UemmRaOwO1XKIdHaRYweMUPvCjnJs8wpFZ.iju', 3, 'Street', 'assets/imgs/police.jpg', true, true);


SELECT * FROM skaters;
