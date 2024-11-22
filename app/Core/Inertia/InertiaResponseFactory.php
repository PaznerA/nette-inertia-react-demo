<?php declare(strict_types=1);

namespace App\Inertia;

use Nette\Bridges\ApplicationLatte\TemplateFactory;

class InertiaResponseFactory
{
    public function __construct(
        private TemplateFactory $templateFactory,
        private string $rootView = __DIR__ . '/App.latte'
    ) {}

    public function create(string $component, array $props = []): InertiaResponse
    {
        return new InertiaResponse(
            component: $component,
            props: $props,
            templateFactory: $this->templateFactory,
            rootView: $this->rootView
        );
    }
}