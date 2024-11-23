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
    public function actionDefault(): void { $this->actionBookIndex(); }
    
    public function actionIndex(): void
    {
        try {
            $books = $this->controller->index();
        } catch (\Exception) {
            if (empty($books)) {
                $this->controller->createDummy();
                $books = $this->controller->index();
            } 
        }
        $this->sendResponse(
            $this->inertiaFactory->create(component: 'Book/Index', props: [
                'books' => $books,
            ])
        );
    }

    public function actionCreate(?array $data = null): void
    {
        $this->sendResponse(
            $this->inertiaFactory->create(component: 'Book/Index', props: [
                'books' => $this->controller->create(),
            ])
        );
    }
}
