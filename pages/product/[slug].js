import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => (x.slug = slug));
  if (!product) {
    return <div>محصول مورد نظر یافت نشد !</div>;
  } else {
    const addToCartHandler = () => {
      const existItem = state.cart.cartItems.find(
        (x) => x.slug === product.slug
      );
      const quantity = existItem ? existItem.quantity + 1 : 1;
      if (product.countInStock < quantity) {
        return;
      }
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
    };
    return (
      <Layout title={product.name}>
        <div className="py-2">
          <Link href="/">بازگشت</Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </li>
              <li>دسته بندی: {product.category}</li>
              <li>برند: {product.brand}</li>
              <li>
                {product.ratting} از {product.ratting} امتیاز
              </li>
              <li>توضیحات: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>قیمت</div>
                <div>{product.price} تومان</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>وضعیت</div>
                <div>
                  {product.countInStock > 0 ? 'موجود' : 'عدم موجود در انبار'}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
