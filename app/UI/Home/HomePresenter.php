<?php declare(strict_types=1);

namespace App\UI\Home;

use Nette;
use App\Inertia\InertiaResponseFactory;

final class HomePresenter extends Nette\Application\UI\Presenter
{

    public function __construct(
        private InertiaResponseFactory $inertiaFactory
    ) {}
    public function actionDefault(): void
    {
        $this->sendResponse(
            $this->inertiaFactory->create('Home/Index', [
                'welcome' => 'Welcome to your Inertia app homepage!',
            ])
        );

    }

    public function actionGreet(string $name): void
    {
        $this->sendResponse(
            $this->inertiaFactory->create('Home/Index', [
                'welcome' => 'Welcome to your Inertia greeting test page!',
                "user" => ["id" => 5, "name" => $name]
            ])
        );

    }
    public function actionDemo(): void
    {
        $this->sendResponse(
            response: $this->inertiaFactory->create(
                component: 'Demo/Index', 
                props: []
            )
        );

    }
}
