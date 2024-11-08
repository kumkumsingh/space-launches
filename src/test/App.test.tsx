  import { MemoryRouter } from 'react-router-dom';
  import { fireEvent, render, screen } from '@testing-library/react';
  import { describe, it, expect, vi } from 'vitest';
  import { LaunchCardProps } from '@/interfaces/componentInterface';
  import LaunchCard from '../components/LaunchCard/LaunchCard';
  import AppHeader from '@/components/Header/Header';

  const mockProps: LaunchCardProps = {
    name: 'Test Launch',
    launchYear: 2024,
    patchImage: 'test-image-url',
    status: true,
    isFavorite: false,
    onAddOrRemoveToFavorites: vi.fn(),
  };

  const mockOnAddOrRemoveToFavorites = vi.fn();

  describe('LaunchCard Component', () => {
    it('renders the launch name, year, status, and image', () => {
      render(<LaunchCard {...mockProps} />);

      expect(screen.getByText('Test Launch')).toBeInTheDocument();

      expect(screen.getByText(/Year: 2024 Status: SUCCESS/i)).toBeInTheDocument();

      const image = screen.getByAltText('Launch Patch');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image-url');
    });

    it('displays "Add to Favorites" when isFavorite is false', () => {
      render(<LaunchCard {...mockProps} isFavorite={false} />);

      const button = screen.getByRole('button', { name: /add to favorites/i });
      expect(button).toBeInTheDocument();
    });

    it('displays "Remove from Favorites" when isFavorite is true', () => {
      render(<LaunchCard {...mockProps} isFavorite={true} />);

      const button = screen.getByRole('button', { name: /remove from favorites/i });
      expect(button).toBeInTheDocument();
    });

    it('calls onAddOrRemoveToFavorites when the button is clicked', () => {
      render(
        <LaunchCard {...mockProps} onAddOrRemoveToFavorites={mockOnAddOrRemoveToFavorites} />
      );

      const button = screen.getByRole('button', { name: /add to favorites/i });
      fireEvent.click(button);

      expect(mockOnAddOrRemoveToFavorites).toHaveBeenCalledTimes(1);
    });
  });
  describe('AppHeader Component', () => {
    it('renders the title and menu items correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AppHeader />
            </MemoryRouter>
        );

        expect(screen.getByText('Space Launches')).toBeInTheDocument();

        expect(screen.getByText('Home')).toBeInTheDocument();

        expect(screen.getByText('Favorites')).toBeInTheDocument();
    });
  });