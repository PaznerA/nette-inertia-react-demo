<?php declare(strict_types=1);

namespace App\Inertia;

use Nette\DI\CompilerExtension;
use Nette\Schema\Expect;
use Nette\Schema\Schema;
use App\Inertia\AssetManager;
use App\Inertia\InertiaMiddleware;

class InertiaExtension extends CompilerExtension
{
    public function getConfigSchema(): Schema
    {
        return Expect::structure([
            'assets' => Expect::structure([
                'manifest' => Expect::string()->required(),
            ]),
            'rootView' => Expect::string('Inertia/App'),
        ]);
    }

    public function loadConfiguration(): void
    {
        $builder = $this->getContainerBuilder();
        $config = $this->config;

        $builder->addDefinition($this->prefix('assetManager'))
            ->setFactory(AssetManager::class)
            ->setArguments([$config->assets->manifest]);

        $builder->addDefinition($this->prefix('middleware'))
            ->setFactory(InertiaMiddleware::class);

        $builder->addDefinition($this->prefix('responseFactory'))
            ->setFactory(InertiaResponseFactory::class, [
                'rootView' => $config->rootView,
            ]);
    }
}