import joinExperiment, { ExperimentData } from '@/abTests/infiniteLoadingExperiment';

describe('Infinite Loading Experiment', () => {
  let session = {};

  beforeEach(() => {
    session = {
      participate: jest.fn().mockImplementation((name, alternatives, callback) =>
        callback(null, {
          alternative: {
            name: ExperimentData.MANUAL_LOADING_EXPERIMENT,
          },
        })),
    };
  });

  it('joins experiment', (done) => {
    const result = joinExperiment(session);
    result.then((res) => {
      expect(res.name).toBe(ExperimentData.EXPERIMENT_NAME);
      expect(res.case).toBe(ExperimentData.MANUAL_LOADING_EXPERIMENT);
      expect(res.session).toBe(session);
      done();
    });
  });

  it('fails gracefully joining experiment', (done) => {
    session = {
      participate: jest.fn().mockImplementation((name, alternatives, callback) =>
        callback({ error: 'foo' }, null)),
    };
    const result = joinExperiment(session);
    result.catch((res) => {
      expect(res.name).toBe(ExperimentData.EXPERIMENT_NAME);
      expect(res.case).toBe(ExperimentData.INFINITE_LOADING_EXPERIMENT);
      expect(res.session).toBe(session);
      done();
    });
  });
});
