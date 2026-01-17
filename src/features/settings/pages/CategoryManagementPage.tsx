import React from 'react';
import { useAppDispatch, useAppSelector, type RootState } from '@app/app/store/store';
import {
    setCategoryModalOpen,
    setSubcategoryModalOpen,
    toggleCategoryExpand,
    openCreateCategoryModal,
    openEditCategoryModal,
    openCreateSubcategoryModal,
    openEditSubcategoryModal
} from '../categories/store/categorySlice';
import { type Category, type Subcategory } from '@app/features/settings/types';
import { Button } from '@app/components/ui/button';
import { Edit, Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@app/lib/utils';
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useDeleteSubcategoryMutation,
} from '@app/features/settings/api';
import { CategoryModal } from '../categories/components/CategoryModal';
import { SubcategoryModal } from '../categories/components/SubcategoryModal';
import { toast } from 'react-toastify';

export const CategoryManagementPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        isCategoryModalOpen,
        isSubcategoryModalOpen,
        selectedCategory,
        selectedSubcategory,
        expandedCategories
    } = useAppSelector((state: RootState) => state.category);

    const { data: categoriesData, isLoading } = useGetCategoriesQuery();
    const categories = categoriesData?.data || [];
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteSubcategory] = useDeleteSubcategoryMutation();

    const handleEditCategory = (category: Category) => {
        dispatch(openEditCategoryModal(category));
    };

    const handleDeleteCategory = async (category: Category) => {
        if (window.confirm(`Are you sure you want to delete category "${category.name}"?`)) {
            try {
                await deleteCategory({ id: category.id }).unwrap();
                toast.success('Category deleted successfully');
            } catch (error: any) {
                toast.error(error?.message || 'Failed to delete category');
            }
        }
    };

    const handleCreateCategory = () => {
        dispatch(openCreateCategoryModal());
    };

    const handleCreateSubcategory = (category: Category) => {
        dispatch(openCreateSubcategoryModal(category));
    };

    const handleEditSubcategory = (subcategory: Subcategory) => {
        dispatch(openEditSubcategoryModal(subcategory));
    };

    const handleDeleteSubcategory = async (subcategory: Subcategory, categoryId: string) => {
        if (window.confirm(`Are you sure you want to delete subcategory "${subcategory.name}"?`)) {
            try {
                await deleteSubcategory({ id: subcategory.id, categoryId }).unwrap();
                toast.success('Subcategory deleted successfully');
            } catch (error: any) {
                toast.error(error?.message || 'Failed to delete subcategory');
            }
        }
    };

    const toggleExpand = (categoryId: string) => {
        dispatch(toggleCategoryExpand(categoryId));
    };

    // Render subcategories row
    const renderSubRow = (row: any) => {
        const category = row.original as Category;
        if (!expandedCategories[category.id]) return null;

        const subcategories = category.subcategories || [];

        if (subcategories.length === 0) {
            return (
                <div className="p-4 pl-12 text-sm text-gray-500 italic bg-gray-50">
                    No subcategories found.
                </div>
            );
        }

        return (
            <div className="bg-gray-50 p-4 pl-12 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Subcategories</h4>
                <div className="space-y-2">
                    {subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-sm">{sub.name}</span>
                                <span className="text-xs text-gray-400">/{sub.slug}</span>
                                <span className={cn("text-[10px] px-1.5 py-0.5 rounded", sub.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600")}>
                                    {sub.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleEditSubcategory(sub)}>
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => handleDeleteSubcategory(sub, category.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <div className="space-y-6 p-6 bg-background-primary">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Category Management</h1>
                    <p className="text-text-secondary text-sm">Manage property categories and subcategories</p>
                </div>
                <Button
                    onClick={handleCreateCategory}
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                {/* We'll use a standard table here for simplicity if DataTable update is too risky, 
               but let's try to stick to standards. I'll implement a custom table structure here
               since the nesting is specific. */}
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[50px]"></th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Slug</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
                            ) : categories.length === 0 ? (
                                <tr><td colSpan={5} className="p-4 text-center">No categories found.</td></tr>
                            ) : (
                                categories.map((category: Category) => (
                                    <React.Fragment key={category.id}>
                                        <tr className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">
                                                <Button variant="ghost" size="sm" onClick={() => toggleExpand(category.id)}>
                                                    {expandedCategories[category.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                </Button>
                                            </td>
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex items-center gap-2">
                                                    {category.imageUrl && (
                                                        <img
                                                            src={category.imageUrl}
                                                            alt={category.name}
                                                            crossOrigin="anonymous"
                                                            className="h-8 w-8 rounded-md object-cover"
                                                        />
                                                    )}
                                                    <span>{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">{category.slug}</td>
                                            <td className="p-4 align-middle">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs font-semibold",
                                                    category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                )}>
                                                    {category.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleCreateSubcategory(category)} title="Add Subcategory">
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category)} className="text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedCategories[category.id] && (
                                            <tr>
                                                <td colSpan={5} className="p-0">
                                                    {renderSubRow({ original: category })}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => dispatch(setCategoryModalOpen(false))}
                category={selectedCategory}
            />

            <SubcategoryModal
                isOpen={isSubcategoryModalOpen}
                onClose={() => dispatch(setSubcategoryModalOpen(false))}
                subcategory={selectedSubcategory}
                parentCategory={selectedCategory}
            />
        </div>
    );
};
