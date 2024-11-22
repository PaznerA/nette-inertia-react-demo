<?php declare(strict_types=1);

namespace App\Inertia;

use Nette\Application\Response;
use Nette\Http\IRequest;
use Nette\Http\IResponse;
use Nette\Bridges\ApplicationLatte\TemplateFactory;

class InertiaResponse implements Response
{

    public function __construct(
        private string $component,
        private array $props = [],
        private ?string $version = null,
        private string $rootView = 'Inertia/App.latte',
        private ?TemplateFactory $templateFactory = null
    ) {}

    public function send(IRequest $httpRequest, IResponse $httpResponse): void
    {
        if ($httpRequest->isAjax()) {
            $httpResponse->setHeader('X-Inertia', 'true');
            $httpResponse->setContentType('application/json');
            
            echo json_encode([
                'component' => $this->component,
                'props' => $this->props,
                'url' => (string) $httpRequest->getUrl(),
                'version' => $this->version,
            ]);
        } else {
            $httpResponse->setContentType('text/html');
            
            $data = [
                'component' => $this->component,
                'props' => $this->props,
                'url' => (string) $httpRequest->getUrl(),
                'version' => $this->version,
            ];

            if ($this->templateFactory) {
                $template = $this->templateFactory->createTemplate();
                $template->setFile($this->rootView);
                /** @phpstan-ignore-next-line */
                $template->page = $data;
                $template->render();
            } else {
                throw new \RuntimeException('TemplateFactory is not set');
            }
        }
    }

    public function getComponent(): string
    {
        return $this->component;
    }

    public function getProps(): array
    {
        return $this->props;
    }

    public function getVersion(): ?string
    {
        return $this->version;
    }
}