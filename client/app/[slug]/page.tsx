"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { slug: string } }) {
  const { allItems, currentAccount, buyItem } = useGlobalContext();
  return (
    <div>
      {allItems.map((item) => {
        let {
          price,
          category,
          itemId,
          seller,
          name,
          image,
          description,
          sold,
          owner,
          tokenId,
        } = item;

        if (itemId.toString() === params.slug) {
          return (
            <div className="p-6 rounded-lg mx-auto max-w-4xl" key={itemId}>
              <h1 className="text-3xl font-semibold mb-4 text-center">
                {name}
              </h1>

              <h2 className="text-md mb-4 text-center">{description}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
                <img
                  src={image}
                  alt={`NFT - ${name}`}
                  className="w-[370px] h-[370px] object-contain rounded-lg col-span-1"
                />
                <div className="lg:mt-4 col-span-1">
                  {!sold && (
                    <div>
                      <h3 className="text-md font-semibold mt-2">Seller</h3>
                      <p className="text-gray-500 text-md">{seller}</p>
                      <h3 className="text-md font-semibold mt-2">Price</h3>
                      <p className="text-gray-500 text-md">{price} ZTH</p>
                    </div>
                  )}

                  <h3 className="text-md font-semibold mt-2">Category</h3>
                  <p className="text-gray-500 text-md">{category}</p>
                  <h3 className="text-md font-semibold mt-2">Item Id</h3>
                  <p className="text-gray-500 text-md">{itemId}</p>
                  <h3 className="text-md font-semibold mt-2">Token Id</h3>
                  <p className="text-gray-500 text-md">{tokenId}</p>
                  {sold && (
                    <div>
                      <h3 className="text-md font-semibold mt-2">Status</h3>
                      <p className="text-gray-500 text-md">Sold</p>
                    </div>
                  )}

                  {owner === currentAccount && (
                    <div>
                      <h3 className="text-md font-semibold mt-2">Owner</h3>
                      {owner === currentAccount && (
                        <p className="text-green-600 text-md">Owned by you</p>
                      )}
                    </div>
                  )}
                  {!sold && (
                    <Button
                      className="mt-4"
                      onClick={() => buyItem(itemId, price)}
                      variant="outline"
                    >
                      Buy
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
