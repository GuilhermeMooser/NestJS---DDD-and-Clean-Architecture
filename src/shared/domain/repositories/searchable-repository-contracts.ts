/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(SearchInput): Promise<SearchOutput>;
}
