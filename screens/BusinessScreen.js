import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import ArticleRow from "../components/ArticleRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setBusiness } from "../features/businessSlice";
import { useState } from "react";
import { product_by_business } from "../api/product_api";
import { getToken } from "../features/authSlice";

const BusinessScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  const token = useSelector(getToken);

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setBusiness({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        // articles,
        long,
        lat,
      })
    );
  }, []);

  useEffect(() => {
    console.log(id);
    product_by_business(token, id)
      .then((result) => {
        if (result.status === 200) {
          setArticles(result.data.data);
          console.log(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              // uri: urlFor(imgUrl).url(),
              uri: imgUrl,
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={25} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-5">
            <Text className="text-3xl font-bold ">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> • {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Cerca •{" "}
                  {address.length > 28
                    ? address.substring(0, 32) + "..."
                    : address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Dudas con nuestros artículos?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Catálogo</Text>
          {articles?.map((article) => (
            <ArticleRow
              key={article._id}
              id={article._id}
              name={article.name}
              description={article.short_description}
              rental_price={article.rental_price}
              url={article.product_image.url}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default BusinessScreen;
