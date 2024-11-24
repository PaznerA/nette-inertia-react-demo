<?php declare(strict_types=1);

namespace App\UI\Books;

use Nette;
use App\Inertia\InertiaResponseFactory;
use App\UI\Books\BooksController;

final class BooksPresenter extends Nette\Application\UI\Presenter
{
    public function __construct(
        private InertiaResponseFactory $inertiaFactory,
        private BooksController $controller
    ) {}

    //todo: extract into base InertiaPresenter?
    public function actionDefault(): void { $this->actionBookIndex();}
    
    public function actionIndex(): void
    {
        bdump($this->getRequest());
        try {
            $books = $this->controller->index();
            bdump($books);
        } catch (\Exception) {
            if (empty($books)) {
                $this->controller->createDummy();
                $books = $this->controller->index();
            } 
        }
        $this->sendResponse(
            $this->inertiaFactory->create(component: 'Book/Index', props: [
                'books' => $books,
                'addBookLink' => $this->link('create')
            ])
        );
    }

    public function actionCreate(?int $bookId = null): void {

        $props = [
            'addBookLink' => $this->link(destination: 'create')
        ];

        if($bookId > 0 ){
            $book = $this->controller->getById($bookId);
            $props['book'] = $book;
        }


        bdump($this->getParameters());
        bdump($this->getRequest());
        bdump($this->getHttpRequest());
        // $books = $this->controller->create($data);

        $this->sendResponse(
            $this->inertiaFactory->create('Book/AddOrEdit', $props)
        ); 
    }

    // public function handleCreate(?array $data = null): void
    // {
    //     bdump($data);
    //     bdump($this->getParameters());
    //     bdump($this->getRequest());
    //     $books = $this->controller->create($data);
    //     $this->sendResponse(
    //         $this->inertiaFactory->create(component: 'Book/Index', props: [
    //             'books' => $books,
    //         ])
    //     );
    // }
}
