import config from '../../config/prod';

export const jwtConstants = {
  secret: config.jwtSecret,
};
