import {APP_FILTER} from '@nestjs/core';
import {BadRequestFilter} from './bad-request.filter';
import {GlobalExceptionFilter} from './global-exception.filter';

const filters = [
    {
        provide: APP_FILTER,
        useClass: BadRequestFilter,
    },
];

if (process.env.NODE_ENV === 'production')
{
    filters.push({
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
    });
}

export { filters };