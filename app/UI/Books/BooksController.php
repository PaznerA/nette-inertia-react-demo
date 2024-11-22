<?php declare(strict_types=1);

namespace App\UI\Books;

use Nette\Database\Connection;

//todo: extract into abstract controller
final class BooksController {
    public function __construct(
        private Connection $db
    ) {}

    /**
     * @param array<string, int|string> $params
     * @return array<int, array<string, mixed>>
     */
    public function index(?array $params = null): array {
        //todo: implement filter params - compatible with DataGrid dataSource?
        return $this->db->query("SELECT * FROM book LIMIT 50")->fetchAll();
    }

    /**
     * @param array<string, int|string> $params
     * @return array<int, array<string, mixed>>
     */
    public function create(?array $data = null): array {

        /** init queries **/
        $queries = require_once(__DIR__ . '/../../../bin/migration.php');
        foreach($queries as $query) {
            $this->db->query($query);
        }

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

        return $this->db->query("SELECT * FROM book LIMIT 50")->fetchAll();
    }


}