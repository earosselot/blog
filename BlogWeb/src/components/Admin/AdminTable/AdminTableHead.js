import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
    enableSorting: true,
  },
  {
    id: 'user',
    numeric: false,
    disablePadding: true,
    label: 'User',
    enableSorting: true,

  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Created at',
    enableSorting: true,

  },
  {
    id: 'published',
    numeric: false,
    disablePadding: true,
    label: 'Published',
    enableSorting: true,

  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: true,
    label: 'Edit',
    enableSorting: false,

  },
  {
    id: 'delete',
    numeric: false,
    disablePadding: true,
    label: 'Delete',
    enableSorting: false,

  },

];

function AdminTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.enableSorting
                ? <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
                : <span>{headCell.label}</span>
              }

            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default AdminTableHead;
