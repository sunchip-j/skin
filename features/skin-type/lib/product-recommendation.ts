import rawProducts from "@/features/skin-type/data/skin-products.json";
import {
  PRODUCT_CATEGORIES,
  getSkinTypeInfo,
} from "@/features/skin-type/data/skin-type-info";
import type {
  ProductCategory,
  ProductRecommendation,
  ResolvedRecommendedProduct,
  SkinProduct,
  SkinTrait,
  SkinTypeCode,
} from "@/features/skin-type/types";

const SUPPORTED_SKIN_TYPE_PATTERN = /^[DO][SR][PN][WT]$/;
const SKIN_TRAIT_PATTERN = /^[DOSRPNWT]$/;
const PRODUCT_CATEGORY_SET = new Set<string>(PRODUCT_CATEGORIES);
const EXPECTED_ACTIVE_PRODUCT_COUNT = 17;
const PIGMENTATION_SERUM_ID = "larocheposay-mela-b3-serum-30";
const WRINKLE_SERUM_ID = "drjart-prejuvenation-firming-bakuchiol-serum-50";

function warnInvalidProduct(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[skin-products] ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === "string" && PRODUCT_CATEGORY_SET.has(value);
}

function isSkinTypeCode(value: unknown): value is SkinTypeCode {
  return typeof value === "string" && SUPPORTED_SKIN_TYPE_PATTERN.test(value);
}

function isSkinTrait(value: unknown): value is SkinTrait {
  return typeof value === "string" && SKIN_TRAIT_PATTERN.test(value);
}

function toStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    return null;
  }

  return value;
}

function validateRecommendation(
  value: unknown,
  productId: string
): ProductRecommendation | null {
  if (!isRecord(value)) {
    warnInvalidProduct(`${productId}: recommendation must be an object.`);
    return null;
  }

  const skinType = value.skinType;
  const focusTraits = value.focusTraits;
  const reason = value.reason;
  const order = value.order;

  if (!isSkinTypeCode(skinType)) {
    warnInvalidProduct(`${productId}: unsupported skinType.`);
    return null;
  }

  if (
    !Array.isArray(focusTraits) ||
    focusTraits.length === 0 ||
    focusTraits.some(
      (trait) => !isSkinTrait(trait) || !skinType.includes(trait)
    )
  ) {
    warnInvalidProduct(
      `${productId}: focusTraits must be included in its skinType.`
    );
    return null;
  }

  if (typeof reason !== "string" || reason.trim() === "") {
    warnInvalidProduct(`${productId}: recommendation reason is required.`);
    return null;
  }

  if (
    typeof order !== "number" ||
    !Number.isFinite(order) ||
    order < 0
  ) {
    warnInvalidProduct(`${productId}: recommendation order must be a number.`);
    return null;
  }

  return {
    skinType,
    focusTraits,
    reason,
    order,
  };
}

function validateProduct(value: unknown, seenIds: Set<string>): SkinProduct | null {
  if (!isRecord(value)) {
    warnInvalidProduct("product must be an object.");
    return null;
  }

  const id = value.id;
  const brand = value.brand;
  const name = value.name;
  const category = value.category;
  const tags = toStringArray(value.tags);
  const summary = value.summary;
  const recommendationsValue = value.recommendations;
  const active = value.active;

  if (typeof id !== "string" || id.trim() === "") {
    warnInvalidProduct("product id is required.");
    return null;
  }

  if (seenIds.has(id)) {
    warnInvalidProduct(`${id}: duplicated product id.`);
    return null;
  }

  if (typeof brand !== "string" || brand.trim() === "") {
    warnInvalidProduct(`${id}: brand is required.`);
    return null;
  }

  if (typeof name !== "string" || name.trim() === "") {
    warnInvalidProduct(`${id}: name is required.`);
    return null;
  }

  if (!isProductCategory(category)) {
    warnInvalidProduct(`${id}: unsupported category.`);
    return null;
  }

  if (!tags) {
    warnInvalidProduct(`${id}: tags must be a string array.`);
    return null;
  }

  if (typeof summary !== "string" || summary.trim() === "") {
    warnInvalidProduct(`${id}: summary is required.`);
    return null;
  }

  if (!Array.isArray(recommendationsValue)) {
    warnInvalidProduct(`${id}: recommendations must be an array.`);
    return null;
  }

  if (typeof active !== "boolean") {
    warnInvalidProduct(`${id}: active must be boolean.`);
    return null;
  }

  const recommendations = recommendationsValue
    .map((recommendation) => validateRecommendation(recommendation, id))
    .filter((recommendation): recommendation is ProductRecommendation =>
      Boolean(recommendation)
    );

  if (active && recommendations.length === 0) {
    warnInvalidProduct(`${id}: no valid recommendations.`);
    return null;
  }

  seenIds.add(id);

  return {
    id,
    brand,
    name,
    category,
    imageUrl:
      typeof value.imageUrl === "string" && value.imageUrl.trim()
        ? value.imageUrl
        : undefined,
    tags,
    summary,
    oliveYoungGoodsNo:
      typeof value.oliveYoungGoodsNo === "string" &&
      value.oliveYoungGoodsNo.trim()
        ? value.oliveYoungGoodsNo
        : undefined,
    oliveYoungUrl:
      typeof value.oliveYoungUrl === "string" && value.oliveYoungUrl.trim()
        ? value.oliveYoungUrl
        : undefined,
    recommendations,
    active,
  };
}

function validateProductCollection(products: SkinProduct[]): void {
  const activeProducts = products.filter((product) => product.active);

  if (activeProducts.length !== EXPECTED_ACTIVE_PRODUCT_COUNT) {
    throw new Error(
      `active 추천 제품은 ${EXPECTED_ACTIVE_PRODUCT_COUNT}개여야 합니다.`
    );
  }

  if (
    products.some(
      (product) => !product.active && product.recommendations.length > 0
    )
  ) {
    throw new Error("비활성 제품에는 추천 매핑을 둘 수 없습니다.");
  }

  const groups = new Map<string, number[]>();

  for (const product of activeProducts) {
    for (const recommendation of product.recommendations) {
      if (
        product.id === PIGMENTATION_SERUM_ID &&
        !recommendation.skinType.includes("P")
      ) {
        throw new Error("색소 세럼은 P 타입에만 추천할 수 있습니다.");
      }

      if (
        product.id === WRINKLE_SERUM_ID &&
        !recommendation.skinType.includes("W")
      ) {
        throw new Error("탄력 세럼은 W 타입에만 추천할 수 있습니다.");
      }

      const key = `${recommendation.skinType}:${product.category}`;
      groups.set(key, [...(groups.get(key) ?? []), recommendation.order]);
    }
  }

  for (const [key, orders] of groups) {
    const sortedOrders = [...orders].sort((a, b) => a - b);
    const expectedOrders = sortedOrders.map((_, index) => index + 1);

    if (
      new Set(sortedOrders).size !== sortedOrders.length ||
      sortedOrders.some((order, index) => order !== expectedOrders[index])
    ) {
      throw new Error(`${key}의 추천 순서는 1부터 중복 없이 이어져야 합니다.`);
    }
  }

  const oilyTypes: SkinTypeCode[] = [
    "ORNT",
    "ORNW",
    "ORPT",
    "ORPW",
    "OSNT",
    "OSNW",
    "OSPT",
    "OSPW",
  ];

  for (const skinType of oilyTypes) {
    if (!groups.has(`${skinType}:moisturizer`)) {
      throw new Error(`${skinType} 타입의 moisturizer 추천이 없습니다.`);
    }
  }
}

export function getSkinProducts(): SkinProduct[] {
  const seenIds = new Set<string>();

  if (!Array.isArray(rawProducts)) {
    warnInvalidProduct("skin-products.json must be an array.");
    return [];
  }

  const products = rawProducts
    .map((product) => validateProduct(product, seenIds))
    .filter((product): product is SkinProduct => Boolean(product));

  validateProductCollection(products);
  return products;
}

export function getRecommendedProducts(
  skinType: SkinTypeCode
): ResolvedRecommendedProduct[] {
  getSkinTypeInfo(skinType);

  return getSkinProducts()
    .filter((product) => product.active)
    .flatMap((product) =>
      product.recommendations
        .filter((recommendation) => recommendation.skinType === skinType)
        .map((recommendation) => ({
          product,
          recommendation,
        }))
    )
    .sort((a, b) => {
      if (a.recommendation.order !== b.recommendation.order) {
        return a.recommendation.order - b.recommendation.order;
      }

      return a.product.id.localeCompare(b.product.id);
    });
}

export function getRecommendedProductsByCategory(
  skinType: SkinTypeCode,
  category: ProductCategory
): ResolvedRecommendedProduct[] {
  return getRecommendedProducts(skinType).filter(
    ({ product }) => product.category === category
  );
}

export function getRecommendedProductGroups(
  skinType: SkinTypeCode
): Array<{
  category: ProductCategory;
  products: ResolvedRecommendedProduct[];
}> {
  return PRODUCT_CATEGORIES.map((category) => ({
    category,
    products: getRecommendedProductsByCategory(skinType, category),
  }));
}
