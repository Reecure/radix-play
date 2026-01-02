import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        children: 'Button',
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'outline', 'ghost'],
            description: 'Visual style of the button',
            table: {
                defaultValue: { summary: 'solid' },
                type: { summary: 'ButtonVariant' },
            },
        },
        intent: {
            control: 'select',
            options: ['primary', 'success', 'danger'],
            description: 'Semantic intent/color scheme',
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: 'ButtonIntent' },
            },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the button',
            table: {
                defaultValue: { summary: 'md' },
                type: { summary: 'ButtonSize' },
            },
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading spinner and disables interaction',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button',
            table: { defaultValue: { summary: 'false' } },
        },
        asChild: {
            control: 'boolean',
            description: 'Merge props onto child element (Radix Slot)',
            table: { defaultValue: { summary: 'false' } },
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler',
        },
    },
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile button component supporting multiple variants, intents, and sizes.

Supports polymorphic rendering via \`asChild\` prop using Radix Slot.
`,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Intents: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button intent="primary">Primary</Button>
            <Button intent="success">Success</Button>
            <Button intent="danger">Danger</Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
};

export const AllCombinations: Story = {
    render: () => {
        const variants = ['solid', 'outline', 'ghost'] as const;
        const intents = ['primary', 'success', 'danger'] as const;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {variants.map((variant) => (
                    <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ width: 60, fontSize: 12, color: '#666' }}>{variant}</span>
                        {intents.map((intent) => (
                            <Button key={`${variant}-${intent}`} variant={variant} intent={intent}>
                                {intent}
                            </Button>
                        ))}
                    </div>
                ))}
            </div>
        );
    },
    parameters: { controls: { disable: true } },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        children: 'Loading',
    },
};

export const LoadingVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant="solid" loading>
                Solid
            </Button>
            <Button variant="outline" loading>
                Outline
            </Button>
            <Button variant="ghost" loading>
                Ghost
            </Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
};

// =============================================================================
// POLYMORPHIC (asChild)
// =============================================================================

export const AsLink: Story = {
    render: () => (
        <Button asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                Link Button
            </a>
        </Button>
    ),
    parameters: { controls: { disable: true } },
};

export const LinksWithVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button asChild variant="solid">
                <a href="#">Solid Link</a>
            </Button>
            <Button asChild variant="outline">
                <a href="#">Outline Link</a>
            </Button>
            <Button asChild variant="ghost">
                <a href="#">Ghost Link</a>
            </Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
};

// =============================================================================
// EDGE CASES - VISUAL
// =============================================================================

export const CustomClassName: Story = {
    args: {
        className: 'my-custom-class',
        children: 'Custom Class',
    },
};

export const WithIcon: Story = {
    render: () => (
        <Button>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="6" fill="currentColor" />
            </svg>
            With Icon
        </Button>
    ),
    parameters: { controls: { disable: true } },
};

export const LongText: Story = {
    args: {
        children: 'This is a very long button text that should not break the layout',
    },
};