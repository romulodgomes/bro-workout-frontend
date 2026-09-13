import { render, screen, within } from '@testing-library/react';
import ExercisesList from './ExercisesList';
import { exercisesAPI } from '../services/api';

jest.mock('../services/api', () => ({
  exercisesAPI: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
}));

const imageUrl = 'https://example.com/exercise.png';

function getExerciseItem(name) {
  return screen.getByText(name).closest('li');
}

describe('ExercisesList', () => {
  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', {
      configurable: true,
      set(value) {
        this._src = value;
        if (this.onload) {
          this.onload();
        }
      },
      get() {
        return this._src;
      },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays the registered image to the left of the exercise name', async () => {
    const exerciseName = 'exercício com imagem 1772529913200';
    exercisesAPI.getAll.mockResolvedValue({
      data: [
        {
          _id: '1',
          nome: exerciseName,
          video: '',
          imagem: imageUrl,
        },
      ],
    });

    render(<ExercisesList />);

    expect(await screen.findByText(exerciseName)).toBeInTheDocument();

    const listItem = getExerciseItem(exerciseName);
    const img = within(listItem).getByRole('img', { name: exerciseName });

    expect(img).toBeVisible();
    expect(img).toHaveAttribute('src', imageUrl);
    expect(img.compareDocumentPosition(within(listItem).getByText(exerciseName))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  test('keeps the default icon when the exercise has no image', async () => {
    exercisesAPI.getAll.mockResolvedValue({
      data: [{ _id: '2', nome: 'Agachamento', video: '', imagem: '' }],
    });

    render(<ExercisesList />);

    expect(await screen.findByText('Agachamento')).toBeInTheDocument();

    const listItem = getExerciseItem('Agachamento');
    expect(within(listItem).queryByRole('img')).not.toBeInTheDocument();
    expect(within(listItem).getByTestId('DirectionsRunIcon')).toBeInTheDocument();
  });
});
