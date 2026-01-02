import type { Meta, StoryObj } from '@storybook/react';

import { expect, within, userEvent, fn } from 'storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Shared/Button/Tests',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const ClickInteraction: Story = {
    args: {
        children: 'Click me',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /click me/i });

        await expect(button).toBeEnabled();
        await expect(args.onClick).not.toHaveBeenCalled();

        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const DisabledPreventsClick: Story = {
    args: {
        disabled: true,
        children: 'Disabled Button',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /disabled button/i });

        await expect(button).toBeDisabled();

        await expect(args.onClick).not.toHaveBeenCalled();
    },
};

export const LoadingPreventsClick: Story = {
    args: {
        loading: true,
        children: 'Loading Button',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /loading button/i });

        await expect(button).toBeDisabled();

        await expect(button).toHaveClass('is-loading');

        await expect(args.onClick).not.toHaveBeenCalled();
    },
};

export const KeyboardEnter: Story = {
    args: {
        children: 'Press Enter',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /press enter/i });

        button.focus();
        await expect(button).toHaveFocus();

        await userEvent.keyboard('{Enter}');

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const KeyboardSpace: Story = {
    args: {
        children: 'Press Space',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /press space/i });

        button.focus();
        await expect(button).toHaveFocus();

        await userEvent.keyboard(' ');

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const TabNavigation: Story = {
    args: {
        children: 'Tab Target',
    },
    render: (args) => (
        <div>
            <input type="text" placeholder="Focus start" />
            <Button {...args} />
            <input type="text" placeholder="Focus end" />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /tab target/i });
        const firstInput = canvas.getByPlaceholderText('Focus start');

        firstInput.focus();
        await expect(firstInput).toHaveFocus();

        await userEvent.tab();
        await expect(button).toHaveFocus();

        await userEvent.tab();
        await expect(button).not.toHaveFocus();
    },
};

export const DisabledNotFocusable: Story = {
    render: () => (
        <div>
            <input type="text" placeholder="Focus start" data-testid="start" />
            <Button disabled>Disabled</Button>
            <input type="text" placeholder="Focus end" data-testid="end" />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /disabled/i });
        const startInput = canvas.getByTestId('start');
        const endInput = canvas.getByTestId('end');

        startInput.focus();
        await expect(startInput).toHaveFocus();

        await userEvent.tab();

        await expect(endInput).toHaveFocus();
        await expect(button).not.toHaveFocus();
    },
};

export const MultipleClicks: Story = {
    args: {
        children: 'Click Multiple',
        onClick: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalledTimes(3);
    },
};

// =============================================================================
// ACCESSIBILITY TESTS
// =============================================================================

export const AccessibleName: Story = {
    args: {
        children: 'Accessible Button',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button', { name: 'Accessible Button' });
        await expect(button).toBeInTheDocument();

        await expect(button).toHaveAccessibleName('Accessible Button');
    },
};

export const WithAriaLabel: Story = {
    args: {
        'aria-label': 'Close dialog',
        children: '×',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const button = canvas.getByRole('button', { name: 'Close dialog' });
        await expect(button).toBeInTheDocument();
        await expect(button).toHaveAccessibleName('Close dialog');
    },
};

export const FocusVisible: Story = {
    args: {
        children: 'Focus Me',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await userEvent.tab();

        await expect(button).toHaveFocus();
    },
};

// =============================================================================
// POLYMORPHIC TESTS
// =============================================================================

export const AsChildRendersAnchor: Story = {
    render: () => (
        <Button asChild>
            <a href="https://example.com" target="_blank" rel="noopener">
                External Link
            </a>
        </Button>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const link = canvas.getByRole('link', { name: /external link/i });
        await expect(link).toBeInTheDocument();

        const button = canvas.queryByRole('button');
        await expect(button).not.toBeInTheDocument();

        await expect(link).toHaveAttribute('href', 'https://example.com');
        await expect(link).toHaveAttribute('target', '_blank');

        await expect(link).toHaveClass('ui-button');
    },
};

export const AsChildMergesClasses: Story = {
    render: () => (
        <Button asChild variant="outline" className="custom-class">
            <a href="#" className="link-class">
                Merged Classes
            </a>
        </Button>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const link = canvas.getByRole('link');

        await expect(link).toHaveClass('ui-button');
        await expect(link).toHaveClass('ui-button--outline');

        await expect(link).toHaveClass('custom-class');

        await expect(link).toHaveClass('link-class');
    },
};

// =============================================================================
// EDGE CASE TESTS
// =============================================================================

export const TypeSubmit: Story = {
    args: {
        type: 'submit',
        children: 'Submit',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toHaveAttribute('type', 'submit');
    },
};

export const DataAttributes: Story = {
    args: {
        'data-testid': 'custom-button',
        'data-analytics': 'cta-click',
        children: 'Tracked Button',
    } as Record<string, string>,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByTestId('custom-button');

        await expect(button).toHaveAttribute('data-analytics', 'cta-click');
    },
};

export const CustomClassNameTest: Story = {
    args: {
        className: 'my-custom-class',
        children: 'Custom Class',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toHaveClass('my-custom-class');
        await expect(button).toHaveClass('ui-button');
    },
};

export const LongTextHeight: Story = {
    args: {
        children: 'This is a very long button text that should not break the layout',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        const rect = button.getBoundingClientRect();

        await expect(rect.height).toBe(40);
    },
};