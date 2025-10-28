import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ filters, onFilterChange, onClearFilters, totalCauses, filteredCount }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'environment', label: 'Environment' },
    { value: 'poverty', label: 'Poverty Relief' },
    { value: 'disaster', label: 'Disaster Relief' },
    { value: 'animal', label: 'Animal Welfare' },
    { value: 'community', label: 'Community Development' }
  ];

  const progressOptions = [
    { value: 'all', label: 'All Progress' },
    { value: 'new', label: 'Just Started (0-25%)' },
    { value: 'active', label: 'Active (25-75%)' },
    { value: 'almost', label: 'Almost Funded (75-99%)' },
    { value: 'completed', label: 'Goal Reached (100%)' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'progress', label: 'Highest Progress' },
    { value: 'goal_high', label: 'Highest Goal' },
    { value: 'goal_low', label: 'Lowest Goal' },
    { value: 'donors', label: 'Most Donors' },
    { value: 'urgent', label: 'Most Urgent' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter & Sort Causes</h2>
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCauses} causes
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category Filter */}
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          className="w-full"
        />

        {/* Progress Filter */}
        <Select
          label="Progress Status"
          options={progressOptions}
          value={filters?.progress}
          onChange={(value) => onFilterChange('progress', value)}
          className="w-full"
        />

        {/* Sort Options */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
          className="w-full"
        />

        {/* Search Input */}
        <Input
          label="Search Causes"
          type="search"
          placeholder="Search by name or charity..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Goal Range Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          label="Min Goal (ALGO)"
          type="number"
          placeholder="0"
          value={filters?.minGoal}
          onChange={(e) => onFilterChange('minGoal', e?.target?.value)}
          min="0"
        />
        <Input
          label="Max Goal (ALGO)"
          type="number"
          placeholder="No limit"
          value={filters?.maxGoal}
          onChange={(e) => onFilterChange('maxGoal', e?.target?.value)}
          min="0"
        />
        <div className="flex items-end">
          <Button
            variant="outline"
            fullWidth
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.category !== 'all' || filters?.progress !== 'all' || filters?.search || filters?.minGoal || filters?.maxGoal) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters?.category !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Category: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}
              <button
                onClick={() => onFilterChange('category', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.progress !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Progress: {progressOptions?.find(opt => opt?.value === filters?.progress)?.label}
              <button
                onClick={() => onFilterChange('progress', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.search && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Search: "{filters?.search}"
              <button
                onClick={() => onFilterChange('search', '')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;
