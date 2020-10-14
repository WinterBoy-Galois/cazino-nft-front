import { IDataTableColumn } from 'react-data-table-component';
import { Breakpoint } from '../../../hooks/useBreakpoint.hook';

export interface TableColumn<T> extends IDataTableColumn<T> {
  hideAtBreakpoint?: Breakpoint;
}
