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

    public function actionDefault(): void
    {
        $this->actionBookIndex();
    }
    
    public function actionIndex(): void
    {
        $this->sendResponse(
            $this->inertiaFactory->create(component: 'Book/Index', props: [
                'books' => $this->controller->index(),
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
