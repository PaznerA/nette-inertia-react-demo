<?php declare(strict_types=1);

namespace App\UI\Books;

use Nette\Database\Connection;

//todo: extract into abstract controller
final class BooksController {
    public function __construct(
        private Connection $db
    ) {}

    /**
     * Emulation of Laravel controller - returns a list of books
     * @param array<string, int|string> $params
     * @return array<int, array<string, mixed>>
     */
    public function index(?array $params = null): array {
        //todo: implement filter params - compatible with DataGrid dataSource?
        return $this->db->query("SELECT * FROM book LIMIT 50")->fetchAll();
    }



    /**
     * Emulation of Laravel controller - create a book
     * @param array<string, int|string> $params
     * @return array<int, array<string, mixed>>
     * @throws \Exception
     */
    public function create(?array $data = null): void {
        $this->db->query("INSERT INTO book", $data);
    }

    /**
     * Temporary func for demo purposes - init db(user,book,tag)
     * @param array<string, int|string> $params
     * @return array<int, array<string, mixed>>
     */
    public function createDummy(?array $data = null): void {

        /** init queries - create tables **/
        $queries = require_once(__DIR__ . '/../../../bin/migration.php');
        foreach($queries as $query) {
            $this->db->query($query);
        }

        /** init queries - add dummy users **/
        $this->db->query("
        INSERT INTO user (username, email, password_hash) VALUES
            ('john_doe', 'john@example.com', 'hashed_password_1'),
            ('jane_smith', 'jane@example.com', 'hashed_password_2'),
            ('bob_johnson', 'bob@example.com', 'hashed_password_3')
        ;");

        if($data === null) {
            $data = [
                "title" => "pokus_asdasd",
                "user_id" => 1,
                "author" => "pepa Zdepa",
                "isbn" => "d64d64d",
            ];
        }
        $this->db->query("INSERT INTO book", $data);
        
        $data["author"] = "Někdo jiný";
        $data["isbn"] = "68d4f6r1gf";
        $this->db->query("INSERT INTO book", $data);
        
        $data["author"] = "Jarda jiný";
        $data["isbn"] = "iwdde59";
        $this->db->query("INSERT INTO book", $data);
    }


}