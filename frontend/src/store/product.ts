import { create } from "zustand";

export type ProductBase = {
    name: string;
    price: number;
    image: string;
};

export type Product = ProductBase & {
    _id: string;
};
type ProductStore = {
    products: Product[];
    fetchProducts: () => Promise<void>;

    setProducts: (products: Product[]) => void;

    createProduct: (
        newProduct: ProductBase
    ) => Promise<{ success: boolean; message: string }>;

    deleteProduct: (
        pid: string
    ) => Promise<{ success: boolean; message: string }>;

    updateProduct: (
        // Add this
        pid: string,
        updatedProduct: ProductBase
    ) => Promise<{ success: boolean; message: string }>;
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),

    createProduct: async (newProduct: ProductBase) => {
        try {
            if (!newProduct.name || !newProduct.price || !newProduct.image) {
                return {
                    success: false,
                    message: "لطفا تمام فیلدها را پر کنید",
                };
            }

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "خطا در ایجاد محصول",
                };
            }

            // Add the new product to the state
            set((state) => ({ products: [...state.products, data] }));
            return { success: true, message: "محصول با موفقیت ایجاد شد" };
        } catch (error) {
            console.error("Create product error:", error);
            return { success: false, message: "خطا در ارتباط با سرور" };
        }
    },

    fetchProducts: async () => {
        try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            set({ products: data.data || data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },

    deleteProduct: async (pid: string) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
    },

    // product.ts
    updateProduct: async (pid: string, updatedProduct: ProductBase) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "خطا در بروزرسانی محصول",
                };
            }

            // Update the product in state
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid
                        ? { ...product, ...updatedProduct }
                        : product
                ),
            }));

            return { success: true, message: "محصول با موفقیت بروزرسانی شد" };
        } catch (error) {
            console.error("Update product error:", error);
            return { success: false, message: "خطا در ارتباط با سرور" };
        }
    },
}));
