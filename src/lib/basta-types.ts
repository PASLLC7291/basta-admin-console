// BASTA GraphQL Management API - Complete Type Catalog
// Organized into 12 categories with 300+ types

export type TypeCategory =
  | 'Query'
  | 'Mutation'
  | 'Object'
  | 'Input'
  | 'Enum'
  | 'Union'
  | 'Connection'
  | 'Edge'
  | 'Interface'
  | 'Scalar'
  | 'Subscription';

export type ApiSource = 'management' | 'client';

export interface BastaType {
  name: string;
  category: TypeCategory;
  description: string;
  fields?: string[];
  section: string;
  apiSource?: ApiSource;
  icon?: string;
  isSubscription?: boolean;
}

export interface BastaSection {
  name: string;
  slug: string;
  icon: string;
  description: string;
  types: BastaType[];
}

// ============================================
// SECTION 1: ACCOUNTS (15 types)
// ============================================
export const accountTypes: BastaType[] = [
  { name: 'Account', category: 'Object', description: 'Main account object containing organization details', fields: ['id', 'name', 'email', 'status', 'createdAt'], section: 'accounts' },
  { name: 'AccountFee', category: 'Object', description: 'Fee configuration for account billing', fields: ['id', 'type', 'amount', 'percentage'], section: 'accounts' },
  { name: 'AccountFeeType', category: 'Enum', description: 'Types of fees: BUYER_PREMIUM, SELLER_COMMISSION, etc.', section: 'accounts' },
  { name: 'AccountImageAssociation', category: 'Object', description: 'Links images to account (logo, banner)', fields: ['imageId', 'type', 'order'], section: 'accounts' },
  { name: 'CreateAccountInput', category: 'Input', description: 'Input for creating a new account', fields: ['name', 'email', 'settings'], section: 'accounts' },
  { name: 'UpdateAccountInput', category: 'Input', description: 'Input for updating account details', fields: ['accountId', 'name', 'email', 'settings'], section: 'accounts' },
  { name: 'CreateAccountFeeInput', category: 'Input', description: 'Input for creating account fee', fields: ['accountId', 'type', 'amount'], section: 'accounts' },
  { name: 'UpdateAccountFeeInput', category: 'Input', description: 'Input for updating account fee', fields: ['feeId', 'amount', 'percentage'], section: 'accounts' },
  { name: 'DeleteAccountFeeInput', category: 'Input', description: 'Input for deleting account fee', fields: ['feeId'], section: 'accounts' },
  { name: 'OnboardPaymentAccountInput', category: 'Input', description: 'Input for payment provider onboarding', fields: ['accountId', 'provider', 'returnUrl'], section: 'accounts' },
  { name: 'OnboardPaymentAccountResponse', category: 'Object', description: 'Response from payment onboarding', fields: ['url', 'status', 'expiresAt'], section: 'accounts' },
  { name: 'ContinueOnboardPaymentAccountInput', category: 'Input', description: 'Continue interrupted payment onboarding', fields: ['accountId', 'sessionId'], section: 'accounts' },
  { name: 'ConnectShopifyToAccountInput', category: 'Input', description: 'Connect Shopify store to account', fields: ['accountId', 'shopifyDomain', 'accessToken'], section: 'accounts' },
  { name: 'ShopifyConfiguration', category: 'Object', description: 'Shopify integration configuration', fields: ['domain', 'syncEnabled', 'productMapping'], section: 'accounts' },
  { name: 'ShopifyConnection', category: 'Object', description: 'Active Shopify connection details', fields: ['id', 'domain', 'status', 'lastSync'], section: 'accounts' },
];

// ============================================
// SECTION 2: SALES/AUCTIONS (45 types)
// ============================================
export const saleTypes: BastaType[] = [
  { name: 'Sale', category: 'Object', description: 'Main sale/auction object', fields: ['id', 'title', 'description', 'status', 'type', 'dates'], section: 'sales' },
  { name: 'SaleConnection', category: 'Connection', description: 'Paginated list of sales', fields: ['edges', 'pageInfo', 'totalCount'], section: 'sales' },
  { name: 'SalesEdge', category: 'Edge', description: 'Edge containing sale node and cursor', fields: ['node', 'cursor'], section: 'sales' },
  { name: 'SaleDates', category: 'Object', description: 'Sale timing configuration', fields: ['openDate', 'closeDate', 'publishDate'], section: 'sales' },
  { name: 'SaleDatesInput', category: 'Input', description: 'Input for setting sale dates', fields: ['openDate', 'closeDate', 'publishDate'], section: 'sales' },
  { name: 'SaleFilter', category: 'Input', description: 'Filter criteria for querying sales', fields: ['status', 'type', 'dateRange', 'searchTerm'], section: 'sales' },
  { name: 'SaleIDType', category: 'Enum', description: 'Types of sale identifiers: ID, SEQUENCE_NUMBER', section: 'sales' },
  { name: 'SaleImageAssociation', category: 'Object', description: 'Links images to sales', fields: ['imageId', 'type', 'order'], section: 'sales' },
  { name: 'SaleItem', category: 'Object', description: 'Item within a sale context', fields: ['id', 'item', 'lotNumber', 'status'], section: 'sales' },
  { name: 'SaleItemFilter', category: 'Input', description: 'Filter for sale items', fields: ['status', 'hasReserve', 'hasBids'], section: 'sales' },
  { name: 'SaleItemInput', category: 'Input', description: 'Input for sale item data', fields: ['itemId', 'lotNumber', 'openingBid'], section: 'sales' },
  { name: 'SaleItemOrItem', category: 'Union', description: 'Union of SaleItem or standalone Item', section: 'sales' },
  { name: 'SaleItemsConnection', category: 'Connection', description: 'Paginated sale items', fields: ['edges', 'pageInfo', 'totalCount'], section: 'sales' },
  { name: 'SaleItemsEdge', category: 'Edge', description: 'Edge for sale item pagination', fields: ['node', 'cursor'], section: 'sales' },
  { name: 'SaleMetrics', category: 'Object', description: 'Sale performance metrics', fields: ['totalBids', 'uniqueBidders', 'totalValue'], section: 'sales' },
  { name: 'SaleStatistics', category: 'Object', description: 'Detailed sale statistics', fields: ['itemsSold', 'itemsUnsold', 'sellThroughRate'], section: 'sales' },
  { name: 'SaleStatisticBidCounts', category: 'Object', description: 'Bid count statistics', fields: ['total', 'byType', 'byHour'], section: 'sales' },
  { name: 'SaleStatus', category: 'Enum', description: 'Sale states: DRAFT, PUBLISHED, OPEN, CLOSING, CLOSED', section: 'sales' },
  { name: 'SaleType', category: 'Enum', description: 'Auction types: TIMED, LIVE, HYBRID', section: 'sales' },
  { name: 'SalesAggregate', category: 'Object', description: 'Aggregated sales data', fields: ['count', 'totalValue', 'averageValue'], section: 'sales' },
  { name: 'SalesAggregateInput', category: 'Input', description: 'Parameters for sales aggregation', fields: ['groupBy', 'dateRange', 'status'], section: 'sales' },
  { name: 'CreateSaleInput', category: 'Input', description: 'Input for creating a new sale', fields: ['title', 'description', 'type', 'dates'], section: 'sales' },
  { name: 'UpdateSaleInput', category: 'Input', description: 'Input for updating sale details', fields: ['saleId', 'title', 'description', 'dates'], section: 'sales' },
  { name: 'DeleteSaleInput', category: 'Input', description: 'Input for deleting a sale', fields: ['saleId', 'force'], section: 'sales' },
  { name: 'OpenSaleInput', category: 'Input', description: 'Input to open sale for bidding', fields: ['saleId', 'notifyBidders'], section: 'sales' },
  { name: 'PublishSaleInput', category: 'Input', description: 'Input to publish sale publicly', fields: ['saleId', 'publishAt'], section: 'sales' },
  { name: 'CloseSaleInput', category: 'Input', description: 'Input to close a sale', fields: ['saleId', 'reason'], section: 'sales' },
  { name: 'StartClosingSaleInput', category: 'Input', description: 'Input to begin closing process', fields: ['saleId', 'closingMethod'], section: 'sales' },
  { name: 'ClosingMethod', category: 'Enum', description: 'How sale closes: SOFT_CLOSE, HARD_CLOSE, STAGGERED', section: 'sales' },
  { name: 'AddItemToSaleInput', category: 'Input', description: 'Input to add item to sale', fields: ['saleId', 'itemId', 'lotNumber'], section: 'sales' },
  { name: 'RemoveSaleItemInput', category: 'Input', description: 'Input to remove item from sale', fields: ['saleId', 'itemId'], section: 'sales' },
  { name: 'HideItemsFromSaleInput', category: 'Input', description: 'Input to hide items from view', fields: ['saleId', 'itemIds'], section: 'sales' },
  { name: 'UnhideItemsFromSaleInput', category: 'Input', description: 'Input to unhide items', fields: ['saleId', 'itemIds'], section: 'sales' },
  { name: 'AddLiveStreamToSaleInput', category: 'Input', description: 'Add live stream to sale', fields: ['saleId', 'streamUrl', 'type'], section: 'sales' },
  { name: 'DeleteLiveStreamFromSaleInput', category: 'Input', description: 'Remove live stream from sale', fields: ['saleId', 'streamId'], section: 'sales' },
  { name: 'AddPaddleToSaleInput', category: 'Input', description: 'Add bidding paddle to sale', fields: ['saleId', 'userId', 'paddleNumber'], section: 'sales' },
  { name: 'RemovePaddleFromSaleInput', category: 'Input', description: 'Remove paddle from sale', fields: ['saleId', 'paddleId'], section: 'sales' },
  { name: 'SaleActivity', category: 'Object', description: 'Sale activity log entry', fields: ['id', 'type', 'timestamp', 'details'], section: 'sales' },
  { name: 'UpdateGlobalClosingTimeCountdownInput', category: 'Input', description: 'Update global closing countdown', fields: ['saleId', 'seconds'], section: 'sales' },
  { name: 'UpdateGlobalDatesInput', category: 'Input', description: 'Bulk update sale dates', fields: ['saleId', 'dates', 'applyToItems'], section: 'sales' },
  { name: 'UpdateGlobalIncrementTableInput', category: 'Input', description: 'Update sale increment table', fields: ['saleId', 'increments'], section: 'sales' },
  { name: 'SetSaleStatusInput', category: 'Input', description: 'Directly set sale status', fields: ['saleId', 'status', 'reason'], section: 'sales' },
  { name: 'SaleSequence', category: 'Object', description: 'Sale sequence numbering', fields: ['prefix', 'currentNumber', 'format'], section: 'sales' },
  { name: 'SaleTerms', category: 'Object', description: 'Sale terms and conditions', fields: ['buyerPremium', 'paymentTerms', 'shippingTerms'], section: 'sales' },
  { name: 'SaleTermsInput', category: 'Input', description: 'Input for sale terms', fields: ['buyerPremium', 'paymentTerms', 'shippingTerms'], section: 'sales' },
];

// ============================================
// SECTION 3: ITEMS/LOTS (55 types)
// ============================================
export const itemTypes: BastaType[] = [
  { name: 'Item', category: 'Object', description: 'Main item/lot object', fields: ['id', 'title', 'description', 'status', 'images'], section: 'items' },
  { name: 'ItemDates', category: 'Object', description: 'Item timing configuration', fields: ['openDate', 'closeDate', 'extendedTo'], section: 'items' },
  { name: 'ItemFilter', category: 'Input', description: 'Filter for querying items', fields: ['status', 'category', 'priceRange'], section: 'items' },
  { name: 'ItemIdsFilter', category: 'Input', description: 'Filter items by specific IDs', fields: ['ids', 'excludeIds'], section: 'items' },
  { name: 'ItemsConnection', category: 'Connection', description: 'Paginated items list', fields: ['edges', 'pageInfo', 'totalCount'], section: 'items' },
  { name: 'ItemsEdge', category: 'Edge', description: 'Edge for item pagination', fields: ['node', 'cursor'], section: 'items' },
  { name: 'ItemsFilter', category: 'Input', description: 'Advanced items filter', fields: ['status', 'saleId', 'tags', 'hasImages'], section: 'items' },
  { name: 'ItemImageAssociation', category: 'Object', description: 'Links images to items', fields: ['imageId', 'order', 'isPrimary'], section: 'items' },
  { name: 'ItemMetadata', category: 'Object', description: 'Custom item metadata', fields: ['key', 'value', 'type'], section: 'items' },
  { name: 'ItemMetadataInput', category: 'Input', description: 'Input for item metadata', fields: ['key', 'value', 'type'], section: 'items' },
  { name: 'ItemNote', category: 'Object', description: 'Internal note on item', fields: ['id', 'content', 'author', 'createdAt'], section: 'items' },
  { name: 'ItemNoteConnection', category: 'Connection', description: 'Paginated item notes', fields: ['edges', 'pageInfo'], section: 'items' },
  { name: 'ItemNoteEdge', category: 'Edge', description: 'Edge for note pagination', fields: ['node', 'cursor'], section: 'items' },
  { name: 'ItemNotification', category: 'Object', description: 'Item notification settings', fields: ['type', 'enabled', 'recipients'], section: 'items' },
  { name: 'ItemFairWarningNotification', category: 'Object', description: 'Fair warning notification', fields: ['enabled', 'message', 'timing'], section: 'items' },
  { name: 'ItemMessageNotification', category: 'Object', description: 'Message notification', fields: ['type', 'message', 'sent'], section: 'items' },
  { name: 'ItemOrderField', category: 'Enum', description: 'Sort fields: CREATED_AT, TITLE, LOT_NUMBER, PRICE', section: 'items' },
  { name: 'ItemOrderInput', category: 'Input', description: 'Sort parameters for items', fields: ['field', 'direction'], section: 'items' },
  { name: 'ItemPrice', category: 'Object', description: 'Item pricing information', fields: ['opening', 'current', 'reserve', 'estimate'], section: 'items' },
  { name: 'ItemPriceInput', category: 'Input', description: 'Input for item pricing', fields: ['opening', 'reserve', 'estimateLow', 'estimateHigh'], section: 'items' },
  { name: 'ItemSchema', category: 'Object', description: 'Custom item field schema', fields: ['id', 'name', 'fields', 'version'], section: 'items' },
  { name: 'ItemSpecifications', category: 'Object', description: 'Item specifications', fields: ['dimensions', 'weight', 'materials'], section: 'items' },
  { name: 'ItemSpecificationsInput', category: 'Input', description: 'Input for specifications', fields: ['dimensions', 'weight', 'materials'], section: 'items' },
  { name: 'ItemStatus', category: 'Enum', description: 'Item states: DRAFT, ACTIVE, SOLD, UNSOLD, WITHDRAWN', section: 'items' },
  { name: 'CreateItemInput', category: 'Input', description: 'Input for creating item', fields: ['title', 'description', 'category', 'images'], section: 'items' },
  { name: 'UpdateItemInput', category: 'Input', description: 'Input for updating item', fields: ['itemId', 'title', 'description'], section: 'items' },
  { name: 'DeleteItemInput', category: 'Input', description: 'Input for deleting item', fields: ['itemId', 'force'], section: 'items' },
  { name: 'GetItemInput', category: 'Input', description: 'Input for getting single item', fields: ['itemId', 'idType'], section: 'items' },
  { name: 'GetItemsInput', category: 'Input', description: 'Input for getting multiple items', fields: ['ids', 'filter', 'pagination'], section: 'items' },
  { name: 'CreateItemImage', category: 'Input', description: 'Input for adding image to item', fields: ['itemId', 'imageId', 'order'], section: 'items' },
  { name: 'DeleteItemImageInput', category: 'Input', description: 'Input for removing image', fields: ['itemId', 'imageId'], section: 'items' },
  { name: 'CreateItemNoteInput', category: 'Input', description: 'Input for creating item note', fields: ['itemId', 'content', 'isInternal'], section: 'items' },
  { name: 'CreateItemSchemaInput', category: 'Input', description: 'Input for custom item schema', fields: ['name', 'fields', 'description'], section: 'items' },
  { name: 'ItemNumberChangeInput', category: 'Input', description: 'Change item/lot number', fields: ['itemId', 'newNumber'], section: 'items' },
  { name: 'UpdateItemNumbersInput', category: 'Input', description: 'Bulk renumber items', fields: ['items', 'startFrom', 'increment'], section: 'items' },
  { name: 'AddTagToItemInput', category: 'Input', description: 'Add tag to item', fields: ['itemId', 'tag'], section: 'items' },
  { name: 'RemoveTagFromItemInput', category: 'Input', description: 'Remove tag from item', fields: ['itemId', 'tag'], section: 'items' },
  { name: 'AddTagToSaleItemInput', category: 'Input', description: 'Add tag to sale item', fields: ['saleId', 'itemId', 'tag'], section: 'items' },
  { name: 'RemoveTagFromSaleItemInput', category: 'Input', description: 'Remove tag from sale item', fields: ['saleId', 'itemId', 'tag'], section: 'items' },
  { name: 'AddFairWarningNotificationToItemInput', category: 'Input', description: 'Add fair warning', fields: ['itemId', 'message', 'timing'], section: 'items' },
  { name: 'AddMessageNotificationToItemInput', category: 'Input', description: 'Add message notification', fields: ['itemId', 'message', 'type'], section: 'items' },
  { name: 'SetItemWinnerInput', category: 'Input', description: 'Set winning bidder', fields: ['itemId', 'userId', 'amount'], section: 'items' },
  { name: 'SetSaleItemStatusInput', category: 'Input', description: 'Set sale item status', fields: ['saleId', 'itemId', 'status'], section: 'items' },
  { name: 'UpdateSaleItemInput', category: 'Input', description: 'Update sale item details', fields: ['saleId', 'itemId', 'lotNumber'], section: 'items' },
  { name: 'Estimate', category: 'Object', description: 'Price estimate range', fields: ['low', 'high', 'currency'], section: 'items' },
  { name: 'SellerLocation', category: 'Object', description: 'Seller/item location', fields: ['city', 'state', 'country', 'postalCode'], section: 'items' },
  { name: 'SellerTerms', category: 'Object', description: 'Seller-specific terms', fields: ['commission', 'paymentTerms', 'specialConditions'], section: 'items' },
  { name: 'SpecificationType', category: 'Enum', description: 'Spec types: DIMENSION, WEIGHT, MATERIAL, CONDITION', section: 'items' },
  { name: 'SpecificationSubType', category: 'Enum', description: 'Spec subtypes for detailed classification', section: 'items' },
  { name: 'MeasurementUnit', category: 'Enum', description: 'Units: CM, INCH, MM, M', section: 'items' },
  { name: 'WeightUnit', category: 'Enum', description: 'Weight units: KG, LB, G, OZ', section: 'items' },
  { name: 'Tag', category: 'Object', description: 'Tag/label object', fields: ['id', 'name', 'color'], section: 'items' },
  { name: 'Link', category: 'Object', description: 'External link on item', fields: ['url', 'title', 'type'], section: 'items' },
  { name: 'LinkInput', category: 'Input', description: 'Input for creating link', fields: ['url', 'title', 'type'], section: 'items' },
  { name: 'LinkType', category: 'Enum', description: 'Link types: EXTERNAL, VIDEO, DOCUMENT, RELATED', section: 'items' },
];

// ============================================
// SECTION 4: BIDS (35 types)
// ============================================
export const bidTypes: BastaType[] = [
  { name: 'Bid', category: 'Object', description: 'Bid object', fields: ['id', 'amount', 'userId', 'itemId', 'timestamp'], section: 'bids' },
  { name: 'BidPlaced', category: 'Union', description: 'Union result of bid placement', section: 'bids' },
  { name: 'BidPlacedSuccess', category: 'Object', description: 'Successful bid placement', fields: ['bid', 'isLeading', 'outbidUsers'], section: 'bids' },
  { name: 'BidPlacedError', category: 'Object', description: 'Failed bid placement', fields: ['code', 'message', 'minimumBid'], section: 'bids' },
  { name: 'BidErrorCode', category: 'Enum', description: 'Error codes: BELOW_MINIMUM, SALE_CLOSED, NOT_REGISTERED', section: 'bids' },
  { name: 'BidStatus', category: 'Enum', description: 'Bid states: ACTIVE, OUTBID, WINNING, CANCELLED', section: 'bids' },
  { name: 'BidType', category: 'Enum', description: 'Bid types: REGULAR, MAX, ABSENTEE, PHONE', section: 'bids' },
  { name: 'BidsConnection', category: 'Connection', description: 'Paginated bids', fields: ['edges', 'pageInfo', 'totalCount'], section: 'bids' },
  { name: 'BidsEdge', category: 'Edge', description: 'Edge for bid pagination', fields: ['node', 'cursor'], section: 'bids' },
  { name: 'BidIncrementTable', category: 'Object', description: 'Bid increment rules', fields: ['ranges', 'defaultIncrement'], section: 'bids' },
  { name: 'BidIncrementTableInput', category: 'Input', description: 'Input for increment table', fields: ['ranges', 'defaultIncrement'], section: 'bids' },
  { name: 'BidIncrementRange', category: 'Object', description: 'Single increment range', fields: ['from', 'to', 'increment'], section: 'bids' },
  { name: 'BidIncrementRangeInput', category: 'Input', description: 'Input for increment range', fields: ['from', 'to', 'increment'], section: 'bids' },
  { name: 'BidOnBehalfInput', category: 'Input', description: 'Place bid on behalf of user', fields: ['itemId', 'userId', 'amount', 'origin'], section: 'bids' },
  { name: 'MaxBidOnBehalfInput', category: 'Input', description: 'Place max/proxy bid on behalf', fields: ['itemId', 'userId', 'maxAmount'], section: 'bids' },
  { name: 'BidOrderByField', category: 'Enum', description: 'Sort fields: AMOUNT, TIMESTAMP, STATUS', section: 'bids' },
  { name: 'BidOrigin', category: 'Object', description: 'Source of bid', fields: ['type', 'details', 'ip'], section: 'bids' },
  { name: 'BidOriginInput', category: 'Input', description: 'Input for bid origin', fields: ['type', 'paddleNumber', 'phoneNumber'], section: 'bids' },
  { name: 'BidOriginType', category: 'Enum', description: 'Origin types: ONLINE, PADDLE, PHONE, ABSENTEE', section: 'bids' },
  { name: 'BidRestrictions', category: 'Object', description: 'Bidding restrictions', fields: ['maxBidAmount', 'requiresApproval', 'blockedUsers'], section: 'bids' },
  { name: 'BidRestrictionsInput', category: 'Input', description: 'Input for bid restrictions', fields: ['maxBidAmount', 'requiresApproval'], section: 'bids' },
  { name: 'BidderToken', category: 'Object', description: 'Bidder authentication token', fields: ['token', 'expiresAt', 'permissions'], section: 'bids' },
  { name: 'BidderTokenInput', category: 'Input', description: 'Input to create bidder token', fields: ['userId', 'saleId', 'permissions'], section: 'bids' },
  { name: 'CancelLatestBidOnItemInput', category: 'Input', description: 'Cancel latest bid', fields: ['itemId', 'reason'], section: 'bids' },
  { name: 'CanceledLatestBidOnItem', category: 'Object', description: 'Cancelled bid result', fields: ['bid', 'newLeadingBid', 'refundStatus'], section: 'bids' },
  { name: 'HighestBidInfo', category: 'Object', description: 'Current highest bid info', fields: ['amount', 'bidder', 'timestamp', 'isProxy'], section: 'bids' },
  { name: 'OnlineBidOrigin', category: 'Object', description: 'Online bid source details', fields: ['ip', 'userAgent', 'platform'], section: 'bids' },
  { name: 'PaddleBidOrigin', category: 'Object', description: 'Paddle bid source details', fields: ['paddleNumber', 'clerkId'], section: 'bids' },
  { name: 'PhoneBidOrigin', category: 'Object', description: 'Phone bid source details', fields: ['phoneNumber', 'operatorId'], section: 'bids' },
  { name: 'ReserveAutoBidMethod', category: 'Enum', description: 'Reserve auto-bid methods: NONE, TO_RESERVE, ABOVE_RESERVE', section: 'bids' },
  { name: 'ReserveStatus', category: 'Enum', description: 'Reserve states: NOT_MET, MET, NO_RESERVE', section: 'bids' },
  { name: 'SetUserIdOnBidInput', category: 'Input', description: 'Assign user to anonymous bid', fields: ['bidId', 'userId'], section: 'bids' },
  { name: 'PlaceBidInput', category: 'Input', description: 'Input for placing a bid', fields: ['itemId', 'amount', 'maxBid'], section: 'bids' },
  { name: 'RetractBidInput', category: 'Input', description: 'Input for retracting a bid', fields: ['bidId', 'reason'], section: 'bids' },
  { name: 'BidHistory', category: 'Object', description: 'Historical bid record', fields: ['bids', 'totalBids', 'uniqueBidders'], section: 'bids' },
];

// ============================================
// SECTION 5: USERS & PARTICIPANTS (25 types)
// ============================================
export const userTypes: BastaType[] = [
  { name: 'User', category: 'Object', description: 'User account object', fields: ['id', 'email', 'name', 'status', 'createdAt'], section: 'users' },
  { name: 'UserEdge', category: 'Edge', description: 'Edge for user pagination', fields: ['node', 'cursor'], section: 'users' },
  { name: 'UsersConnection', category: 'Connection', description: 'Paginated users', fields: ['edges', 'pageInfo', 'totalCount'], section: 'users' },
  { name: 'UserAddress', category: 'Object', description: 'User address', fields: ['street', 'city', 'state', 'postalCode', 'country'], section: 'users' },
  { name: 'UserInfo', category: 'Object', description: 'Extended user details', fields: ['firstName', 'lastName', 'phone', 'company'], section: 'users' },
  { name: 'UserToken', category: 'Object', description: 'User authentication token', fields: ['token', 'expiresAt', 'refreshToken'], section: 'users' },
  { name: 'UserTokenInput', category: 'Input', description: 'Input to create user token', fields: ['userId', 'permissions', 'expiresIn'], section: 'users' },
  { name: 'UserIdType', category: 'Enum', description: 'User ID types: ID, EMAIL, EXTERNAL_ID', section: 'users' },
  { name: 'UserBidActivity', category: 'Object', description: 'User bidding activity', fields: ['saleId', 'itemId', 'bid', 'status'], section: 'users' },
  { name: 'UserBidActivityConnection', category: 'Connection', description: 'Paginated user activity', fields: ['edges', 'pageInfo'], section: 'users' },
  { name: 'UserBidActivityEdge', category: 'Edge', description: 'Edge for activity pagination', fields: ['node', 'cursor'], section: 'users' },
  { name: 'UserBidActivityFilter', category: 'Input', description: 'Filter user activity', fields: ['saleId', 'status', 'dateRange'], section: 'users' },
  { name: 'Participant', category: 'Object', description: 'Sale participant', fields: ['id', 'user', 'paddle', 'status'], section: 'users' },
  { name: 'ParticipantsConnection', category: 'Connection', description: 'Paginated participants', fields: ['edges', 'pageInfo', 'totalCount'], section: 'users' },
  { name: 'ParticipantsEdge', category: 'Edge', description: 'Edge for participant pagination', fields: ['node', 'cursor'], section: 'users' },
  { name: 'Paddle', category: 'Object', description: 'Bidding paddle', fields: ['id', 'number', 'user', 'sale', 'status'], section: 'users' },
  { name: 'PaddleType', category: 'Enum', description: 'Paddle types: STANDARD, VIP, PHONE', section: 'users' },
  { name: 'RegisterUserPaddleInput', category: 'Input', description: 'Register paddle for user', fields: ['userId', 'saleId', 'paddleNumber'], section: 'users' },
  { name: 'MailingAddress', category: 'Object', description: 'Mailing address', fields: ['line1', 'line2', 'city', 'state', 'postalCode', 'country'], section: 'users' },
  { name: 'MailingAddressInput', category: 'Input', description: 'Input for mailing address', fields: ['line1', 'line2', 'city', 'state', 'postalCode', 'country'], section: 'users' },
  { name: 'AddressType', category: 'Enum', description: 'Address types: BILLING, SHIPPING, PRIMARY', section: 'users' },
  { name: 'Country', category: 'Enum', description: 'ISO country codes', section: 'users' },
  { name: 'Permission', category: 'Enum', description: 'User permissions: READ, WRITE, ADMIN, BID', section: 'users' },
  { name: 'ClientPermission', category: 'Enum', description: 'Client-level permissions', section: 'users' },
  { name: 'TokenMetadata', category: 'Object', description: 'Token metadata', fields: ['createdAt', 'lastUsed', 'permissions'], section: 'users' },
];

// ============================================
// SECTION 6: REGISTRATIONS (20 types)
// ============================================
export const registrationTypes: BastaType[] = [
  { name: 'SaleRegistration', category: 'Object', description: 'Sale registration record', fields: ['id', 'user', 'sale', 'status', 'createdAt'], section: 'registrations' },
  { name: 'SaleRegistrationEdge', category: 'Edge', description: 'Edge for registration pagination', fields: ['node', 'cursor'], section: 'registrations' },
  { name: 'SaleRegistrationsConnection', category: 'Connection', description: 'Paginated registrations', fields: ['edges', 'pageInfo', 'totalCount'], section: 'registrations' },
  { name: 'SaleRegistrationStatus', category: 'Enum', description: 'Status: PENDING, APPROVED, REJECTED, CANCELLED', section: 'registrations' },
  { name: 'SaleRegistrationType', category: 'Enum', description: 'Registration types: STANDARD, VIP, DEALER', section: 'registrations' },
  { name: 'SaleRegistrationSortByField', category: 'Enum', description: 'Sort fields: CREATED_AT, STATUS, USER_NAME', section: 'registrations' },
  { name: 'SaleRegistrationsForSaleFilter', category: 'Input', description: 'Filter registrations for sale', fields: ['status', 'type', 'searchTerm'], section: 'registrations' },
  { name: 'SaleRegistrationsQueryFilter', category: 'Input', description: 'Query filter for registrations', fields: ['saleId', 'userId', 'status'], section: 'registrations' },
  { name: 'CreateSaleRegistrationInput', category: 'Input', description: 'Create registration', fields: ['saleId', 'userId', 'type'], section: 'registrations' },
  { name: 'AcceptSaleRegistrationInput', category: 'Input', description: 'Accept registration', fields: ['registrationId', 'paddleNumber'], section: 'registrations' },
  { name: 'RejectSaleRegistrationInput', category: 'Input', description: 'Reject registration', fields: ['registrationId', 'reason'], section: 'registrations' },
  { name: 'DeleteSaleRegistrationInput', category: 'Input', description: 'Delete registration', fields: ['registrationId'], section: 'registrations' },
  { name: 'SaleItemRegistration', category: 'Object', description: 'Item-level registration', fields: ['id', 'user', 'item', 'maxBid'], section: 'registrations' },
  { name: 'SaleItemRegistrationEdge', category: 'Edge', description: 'Edge for item registration', fields: ['node', 'cursor'], section: 'registrations' },
  { name: 'SaleItemRegistrationsConnection', category: 'Connection', description: 'Paginated item registrations', fields: ['edges', 'pageInfo'], section: 'registrations' },
  { name: 'SaleItemRegistrationFilter', category: 'Input', description: 'Filter item registrations', fields: ['itemId', 'userId', 'hasMaxBid'], section: 'registrations' },
  { name: 'CreateSaleItemRegistrationInput', category: 'Input', description: 'Create item registration', fields: ['saleId', 'itemId', 'userId', 'maxBid'], section: 'registrations' },
  { name: 'DeleteSaleItemRegistrationInput', category: 'Input', description: 'Delete item registration', fields: ['registrationId'], section: 'registrations' },
  { name: 'UpdateSaleItemRegistrationInput', category: 'Input', description: 'Update item registration', fields: ['registrationId', 'maxBid'], section: 'registrations' },
  { name: 'BulkRegistrationInput', category: 'Input', description: 'Bulk registration import', fields: ['saleId', 'registrations'], section: 'registrations' },
];

// ============================================
// SECTION 7: ORDERS & PAYMENTS (35 types)
// ============================================
export const orderTypes: BastaType[] = [
  { name: 'Order', category: 'Object', description: 'Order object', fields: ['id', 'user', 'items', 'total', 'status'], section: 'orders' },
  { name: 'OrderConnection', category: 'Connection', description: 'Paginated orders', fields: ['edges', 'pageInfo', 'totalCount'], section: 'orders' },
  { name: 'OrderEdge', category: 'Edge', description: 'Edge for order pagination', fields: ['node', 'cursor'], section: 'orders' },
  { name: 'OrderLine', category: 'Object', description: 'Order line item', fields: ['id', 'item', 'amount', 'fees'], section: 'orders' },
  { name: 'OrderLineFee', category: 'Object', description: 'Fee on order line', fields: ['type', 'amount', 'description'], section: 'orders' },
  { name: 'OrderLineType', category: 'Enum', description: 'Line types: ITEM, FEE, SHIPPING, TAX', section: 'orders' },
  { name: 'OrderStatus', category: 'Enum', description: 'Order states: PENDING, PAID, SHIPPED, COMPLETED', section: 'orders' },
  { name: 'CreateOrderInput', category: 'Input', description: 'Create order', fields: ['userId', 'saleId', 'items'], section: 'orders' },
  { name: 'UpdateOrderInput', category: 'Input', description: 'Update order', fields: ['orderId', 'status', 'notes'], section: 'orders' },
  { name: 'CreateOrderLineInput', category: 'Input', description: 'Add order line', fields: ['orderId', 'itemId', 'amount'], section: 'orders' },
  { name: 'CreateOrderLineForOrderInput', category: 'Input', description: 'Add line to existing order', fields: ['orderId', 'itemId', 'fees'], section: 'orders' },
  { name: 'UpdateOrderLineInput', category: 'Input', description: 'Update order line', fields: ['lineId', 'amount', 'fees'], section: 'orders' },
  { name: 'DeleteOrderLineInput', category: 'Input', description: 'Remove order line', fields: ['lineId'], section: 'orders' },
  { name: 'UpdateOrderLineFeeInput', category: 'Input', description: 'Update line fee', fields: ['lineId', 'feeType', 'amount'], section: 'orders' },
  { name: 'Payment', category: 'Object', description: 'Payment record', fields: ['id', 'amount', 'status', 'method', 'timestamp'], section: 'orders' },
  { name: 'PaymentDetails', category: 'Object', description: 'Payment details', fields: ['cardLast4', 'cardBrand', 'receiptUrl'], section: 'orders' },
  { name: 'PaymentOrder', category: 'Object', description: 'Payment order', fields: ['id', 'order', 'payment', 'status'], section: 'orders' },
  { name: 'PaymentProviderStatus', category: 'Enum', description: 'Provider states: ACTIVE, PENDING, FAILED', section: 'orders' },
  { name: 'PaymentAccountType', category: 'Enum', description: 'Account types: STRIPE, PAYPAL, BANK', section: 'orders' },
  { name: 'CreatePaymentInput', category: 'Input', description: 'Create payment', fields: ['orderId', 'amount', 'method'], section: 'orders' },
  { name: 'CreatePaymentOrderInput', category: 'Input', description: 'Create payment order', fields: ['orderId', 'paymentMethod'], section: 'orders' },
  { name: 'CreatePaymentOrderLineInput', category: 'Input', description: 'Add payment order line', fields: ['paymentOrderId', 'amount'], section: 'orders' },
  { name: 'CreatePaymentOrderLineFeeInput', category: 'Input', description: 'Add fee to payment line', fields: ['lineId', 'feeType', 'amount'], section: 'orders' },
  { name: 'UpdatePaymentOrderInput', category: 'Input', description: 'Update payment order', fields: ['paymentOrderId', 'status'], section: 'orders' },
  { name: 'UpdatePaymentOrderLineInput', category: 'Input', description: 'Update payment line', fields: ['lineId', 'amount'], section: 'orders' },
  { name: 'DeletePaymentOrderInput', category: 'Input', description: 'Delete payment order', fields: ['paymentOrderId'], section: 'orders' },
  { name: 'PublishPaymentOrderInput', category: 'Input', description: 'Publish payment order', fields: ['paymentOrderId', 'notifyUser'], section: 'orders' },
  { name: 'CancelPaymentOrderInput', category: 'Input', description: 'Cancel payment order', fields: ['paymentOrderId', 'reason'], section: 'orders' },
  { name: 'Invoice', category: 'Object', description: 'Invoice record', fields: ['id', 'order', 'number', 'total', 'dueDate'], section: 'orders' },
  { name: 'CreateInvoiceInput', category: 'Input', description: 'Create invoice', fields: ['orderId', 'dueDate', 'notes'], section: 'orders' },
  { name: 'Currency', category: 'Enum', description: 'Currency codes: USD, EUR, GBP, etc.', section: 'orders' },
  { name: 'RefundInput', category: 'Input', description: 'Process refund', fields: ['paymentId', 'amount', 'reason'], section: 'orders' },
  { name: 'Refund', category: 'Object', description: 'Refund record', fields: ['id', 'payment', 'amount', 'status'], section: 'orders' },
  { name: 'PaymentMethod', category: 'Enum', description: 'Payment methods: CARD, BANK, WIRE, CHECK', section: 'orders' },
  { name: 'OrderFilter', category: 'Input', description: 'Filter orders', fields: ['status', 'userId', 'saleId', 'dateRange'], section: 'orders' },
];

// ============================================
// SECTION 8: IMAGES & MEDIA (20 types)
// ============================================
export const mediaTypes: BastaType[] = [
  { name: 'Image', category: 'Object', description: 'Image object', fields: ['id', 'url', 'width', 'height', 'format'], section: 'media' },
  { name: 'ImageAssociation', category: 'Object', description: 'Image association', fields: ['imageId', 'entityId', 'entityType', 'order'], section: 'media' },
  { name: 'ImageIdType', category: 'Enum', description: 'Image ID types: ID, URL, EXTERNAL_ID', section: 'media' },
  { name: 'ImageOrderInput', category: 'Input', description: 'Sort images', fields: ['imageId', 'order'], section: 'media' },
  { name: 'ImageType', category: 'Enum', description: 'Image types: PRIMARY, GALLERY, THUMBNAIL', section: 'media' },
  { name: 'ImageWithAssociations', category: 'Object', description: 'Full image with associations', fields: ['image', 'associations'], section: 'media' },
  { name: 'CreateUploadUrlInput', category: 'Input', description: 'Get presigned upload URL', fields: ['filename', 'contentType', 'size'], section: 'media' },
  { name: 'UploadUrl', category: 'Object', description: 'Presigned upload URL', fields: ['url', 'fields', 'expiresAt'], section: 'media' },
  { name: 'DeleteImageInput', category: 'Input', description: 'Delete image', fields: ['imageId', 'force'], section: 'media' },
  { name: 'ReorderImagesInput', category: 'Input', description: 'Reorder images', fields: ['entityId', 'imageOrders'], section: 'media' },
  { name: 'ReorderItemImages', category: 'Object', description: 'Reorder result', fields: ['item', 'images'], section: 'media' },
  { name: 'SaleImageAssociation', category: 'Object', description: 'Sale image association', fields: ['imageId', 'saleId', 'type'], section: 'media' },
  { name: 'SaleItemImageAssociation', category: 'Object', description: 'Sale item image', fields: ['imageId', 'saleItemId', 'order'], section: 'media' },
  { name: 'ImageVariant', category: 'Object', description: 'Image size variant', fields: ['url', 'width', 'height', 'format'], section: 'media' },
  { name: 'ImageFormat', category: 'Enum', description: 'Image formats: JPEG, PNG, WEBP, AVIF', section: 'media' },
  { name: 'CreateImageInput', category: 'Input', description: 'Create image record', fields: ['url', 'width', 'height'], section: 'media' },
  { name: 'UpdateImageInput', category: 'Input', description: 'Update image', fields: ['imageId', 'altText', 'caption'], section: 'media' },
  { name: 'ImageMetadata', category: 'Object', description: 'Image metadata', fields: ['altText', 'caption', 'copyright'], section: 'media' },
  { name: 'BulkUploadInput', category: 'Input', description: 'Bulk image upload', fields: ['entityId', 'files'], section: 'media' },
  { name: 'BulkUploadResult', category: 'Object', description: 'Bulk upload result', fields: ['succeeded', 'failed', 'images'], section: 'media' },
];

// ============================================
// SECTION 9: WEBHOOKS & API (27 types)
// ============================================
export const webhookTypes: BastaType[] = [
  { name: 'ActionHookSubscription', category: 'Object', description: 'Webhook subscription', fields: ['id', 'url', 'events', 'status'], section: 'webhooks' },
  { name: 'ActionHookSubscriptionInput', category: 'Input', description: 'Create webhook', fields: ['url', 'events', 'headers'], section: 'webhooks' },
  { name: 'UpdateActionHookSubscriptionInput', category: 'Input', description: 'Update webhook', fields: ['subscriptionId', 'url', 'events'], section: 'webhooks' },
  { name: 'DeleteActionHookSubscriptionInput', category: 'Input', description: 'Delete webhook', fields: ['subscriptionId'], section: 'webhooks' },
  { name: 'ActionHookFilter', category: 'Object', description: 'Webhook filter', fields: ['saleId', 'itemId', 'eventTypes'], section: 'webhooks' },
  { name: 'ActionHookLog', category: 'Object', description: 'Webhook delivery log', fields: ['id', 'subscription', 'event', 'response', 'timestamp'], section: 'webhooks' },
  { name: 'ActionHookLogConnection', category: 'Connection', description: 'Paginated webhook logs', fields: ['edges', 'pageInfo'], section: 'webhooks' },
  { name: 'ActionHookLogEdge', category: 'Edge', description: 'Edge for log pagination', fields: ['node', 'cursor'], section: 'webhooks' },
  { name: 'ActionHookStatus', category: 'Enum', description: 'Webhook states: ACTIVE, PAUSED, FAILED', section: 'webhooks' },
  { name: 'ActionType', category: 'Enum', description: 'Event types: BID_PLACED, SALE_OPENED, ITEM_SOLD, etc.', section: 'webhooks' },
  { name: 'TestActionHookResponse', category: 'Object', description: 'Webhook test result', fields: ['success', 'response', 'latency'], section: 'webhooks' },
  { name: 'HttpHeader', category: 'Object', description: 'HTTP header', fields: ['name', 'value'], section: 'webhooks' },
  { name: 'HttpHeaderInput', category: 'Input', description: 'Input for HTTP header', fields: ['name', 'value'], section: 'webhooks' },
  { name: 'ApiKey', category: 'Object', description: 'API key', fields: ['id', 'name', 'prefix', 'role', 'createdAt'], section: 'webhooks' },
  { name: 'ApiKeyConnection', category: 'Connection', description: 'Paginated API keys', fields: ['edges', 'pageInfo'], section: 'webhooks' },
  { name: 'ApiKeyEdge', category: 'Edge', description: 'Edge for key pagination', fields: ['node', 'cursor'], section: 'webhooks' },
  { name: 'ApiKeyCreated', category: 'Object', description: 'Newly created API key', fields: ['key', 'secret', 'expiresAt'], section: 'webhooks' },
  { name: 'ApiKeyInput', category: 'Input', description: 'Create API key', fields: ['name', 'role', 'expiresAt'], section: 'webhooks' },
  { name: 'ApiKeyRole', category: 'Enum', description: 'Key roles: READ, WRITE, ADMIN', section: 'webhooks' },
  { name: 'RevokeApiKeyInput', category: 'Input', description: 'Revoke API key', fields: ['keyId'], section: 'webhooks' },
  { name: 'ApiToken', category: 'Object', description: 'API token', fields: ['id', 'name', 'role', 'lastUsed'], section: 'webhooks' },
  { name: 'ApiTokenConnection', category: 'Connection', description: 'Paginated API tokens', fields: ['edges', 'pageInfo'], section: 'webhooks' },
  { name: 'ApiTokensEdge', category: 'Edge', description: 'Edge for token pagination', fields: ['node', 'cursor'], section: 'webhooks' },
  { name: 'ApiTokenCreated', category: 'Object', description: 'Newly created token', fields: ['token', 'expiresAt'], section: 'webhooks' },
  { name: 'ApiTokenInput', category: 'Input', description: 'Create API token', fields: ['name', 'role', 'permissions'], section: 'webhooks' },
  { name: 'ApiTokenRole', category: 'Enum', description: 'Token roles: USER, SERVICE, ADMIN', section: 'webhooks' },
  { name: 'RevokeApiTokenInput', category: 'Input', description: 'Revoke API token', fields: ['tokenId'], section: 'webhooks' },
];

// ============================================
// SECTION 10: METADATA & CONFIG (20 types)
// ============================================
export const configTypes: BastaType[] = [
  { name: 'Metafield', category: 'Object', description: 'Custom metadata field', fields: ['id', 'key', 'value', 'type'], section: 'config' },
  { name: 'MetafieldEntityType', category: 'Enum', description: 'Entity types: ITEM, SALE, USER, ACCOUNT', section: 'config' },
  { name: 'MetafieldValueType', category: 'Enum', description: 'Value types: STRING, NUMBER, BOOLEAN, JSON', section: 'config' },
  { name: 'MetafieldInput', category: 'Input', description: 'Create metafield', fields: ['entityId', 'entityType', 'key', 'value'], section: 'config' },
  { name: 'GetMetafieldInput', category: 'Input', description: 'Get single metafield', fields: ['entityId', 'key'], section: 'config' },
  { name: 'GetMetafieldsInput', category: 'Input', description: 'Get multiple metafields', fields: ['entityId', 'keys'], section: 'config' },
  { name: 'SetMetafieldInput', category: 'Input', description: 'Set metafield value', fields: ['entityId', 'key', 'value', 'type'], section: 'config' },
  { name: 'DeleteMetafieldInput', category: 'Input', description: 'Delete metafield', fields: ['entityId', 'key'], section: 'config' },
  { name: 'FeeRule', category: 'Object', description: 'Fee calculation rule', fields: ['id', 'type', 'amount', 'percentage', 'ranges'], section: 'config' },
  { name: 'FeeRuleType', category: 'Enum', description: 'Rule types: FLAT, PERCENTAGE, TIERED', section: 'config' },
  { name: 'RangeRule', category: 'Object', description: 'Range-based rule', fields: ['from', 'to', 'value'], section: 'config' },
  { name: 'RangeRuleInput', category: 'Input', description: 'Input for range rule', fields: ['from', 'to', 'value'], section: 'config' },
  { name: 'Aggregator', category: 'Object', description: 'Data aggregator', fields: ['type', 'value', 'count'], section: 'config' },
  { name: 'SearchKey', category: 'Enum', description: 'Search keys: TITLE, DESCRIPTION, TAGS, ALL', section: 'config' },
  { name: 'AccountSettings', category: 'Object', description: 'Account settings', fields: ['timezone', 'currency', 'locale'], section: 'config' },
  { name: 'AccountSettingsInput', category: 'Input', description: 'Update account settings', fields: ['timezone', 'currency', 'locale'], section: 'config' },
  { name: 'NotificationSettings', category: 'Object', description: 'Notification preferences', fields: ['email', 'sms', 'push'], section: 'config' },
  { name: 'NotificationSettingsInput', category: 'Input', description: 'Update notifications', fields: ['email', 'sms', 'push'], section: 'config' },
  { name: 'FeatureFlag', category: 'Object', description: 'Feature flag', fields: ['key', 'enabled', 'rollout'], section: 'config' },
  { name: 'FeatureFlagInput', category: 'Input', description: 'Set feature flag', fields: ['key', 'enabled'], section: 'config' },
];

// ============================================
// SECTION 11: LIVE STREAMING (15 types)
// ============================================
export const liveTypes: BastaType[] = [
  { name: 'LiveStream', category: 'Object', description: 'Live stream object', fields: ['id', 'url', 'type', 'status'], section: 'live' },
  { name: 'LiveStreamInput', category: 'Input', description: 'Create live stream', fields: ['url', 'type', 'startTime'], section: 'live' },
  { name: 'LiveStreamType', category: 'Enum', description: 'Stream types: YOUTUBE, VIMEO, BASTA, CUSTOM', section: 'live' },
  { name: 'LiveItem', category: 'Object', description: 'Currently live item', fields: ['item', 'currentBid', 'timeRemaining'], section: 'live' },
  { name: 'BastaLiveStream', category: 'Object', description: 'BASTA-hosted stream', fields: ['streamKey', 'ingestUrl', 'playbackUrl'], section: 'live' },
  { name: 'ExternalLiveStream', category: 'Object', description: 'External stream', fields: ['url', 'embedCode', 'provider'], section: 'live' },
  { name: 'SellLiveItemInput', category: 'Input', description: 'Sell live item', fields: ['itemId', 'winnerId', 'amount'], section: 'live' },
  { name: 'PassLiveItemInput', category: 'Input', description: 'Pass on live item', fields: ['itemId', 'reason'], section: 'live' },
  { name: 'LiveAuctionState', category: 'Object', description: 'Live auction state', fields: ['currentItem', 'nextItems', 'bidders'], section: 'live' },
  { name: 'LiveBidInput', category: 'Input', description: 'Place live bid', fields: ['itemId', 'amount', 'paddleNumber'], section: 'live' },
  { name: 'LiveClerkAction', category: 'Enum', description: 'Clerk actions: FAIR_WARNING, GOING_ONCE, SOLD', section: 'live' },
  { name: 'LiveClerkActionInput', category: 'Input', description: 'Execute clerk action', fields: ['itemId', 'action', 'message'], section: 'live' },
  { name: 'LiveStreamStatus', category: 'Enum', description: 'Stream status: SCHEDULED, LIVE, ENDED', section: 'live' },
  { name: 'UpdateLiveStreamInput', category: 'Input', description: 'Update live stream', fields: ['streamId', 'url', 'status'], section: 'live' },
  { name: 'LiveStreamMetrics', category: 'Object', description: 'Stream metrics', fields: ['viewers', 'peakViewers', 'duration'], section: 'live' },
];

// ============================================
// SECTION 12: CORE TYPES (15 types)
// ============================================
export const coreTypes: BastaType[] = [
  { name: 'Node', category: 'Interface', description: 'Base interface with ID field', fields: ['id'], section: 'core' },
  { name: 'PageInfo', category: 'Object', description: 'Pagination information', fields: ['hasNextPage', 'hasPreviousPage', 'startCursor', 'endCursor'], section: 'core' },
  { name: 'PaginationDirection', category: 'Enum', description: 'Page direction: FORWARD, BACKWARD', section: 'core' },
  { name: 'Boolean', category: 'Scalar', description: 'Boolean scalar type', section: 'core' },
  { name: 'String', category: 'Scalar', description: 'String scalar type', section: 'core' },
  { name: 'Int', category: 'Scalar', description: 'Integer scalar type', section: 'core' },
  { name: 'Float', category: 'Scalar', description: 'Float scalar type', section: 'core' },
  { name: 'ID', category: 'Scalar', description: 'Unique identifier scalar', section: 'core' },
  { name: 'JSON', category: 'Scalar', description: 'JSON scalar for arbitrary data', section: 'core' },
  { name: 'DateTime', category: 'Scalar', description: 'ISO 8601 date-time string', section: 'core' },
  { name: 'Date', category: 'Scalar', description: 'ISO 8601 date string', section: 'core' },
  { name: 'Money', category: 'Scalar', description: 'Monetary value with currency', section: 'core' },
  { name: 'URL', category: 'Scalar', description: 'Valid URL string', section: 'core' },
  { name: 'Email', category: 'Scalar', description: 'Valid email address', section: 'core' },
  { name: 'Phone', category: 'Scalar', description: 'Phone number string', section: 'core' },
];

// ============================================
// ALL SECTIONS COMBINED
// ============================================
export const bastaSections: BastaSection[] = [
  {
    name: 'Accounts',
    slug: 'accounts',
    icon: 'Building2',
    description: 'Account management, fees, and payment onboarding',
    types: accountTypes,
  },
  {
    name: 'Sales',
    slug: 'sales',
    icon: 'Gavel',
    description: 'Auctions, sales, and bidding events',
    types: saleTypes,
  },
  {
    name: 'Items',
    slug: 'items',
    icon: 'Package',
    description: 'Items, lots, and inventory management',
    types: itemTypes,
  },
  {
    name: 'Bids',
    slug: 'bids',
    icon: 'TrendingUp',
    description: 'Bidding operations and management',
    types: bidTypes,
  },
  {
    name: 'Users',
    slug: 'users',
    icon: 'Users',
    description: 'Users, participants, and paddles',
    types: userTypes,
  },
  {
    name: 'Registrations',
    slug: 'registrations',
    icon: 'ClipboardList',
    description: 'Sale and item registrations',
    types: registrationTypes,
  },
  {
    name: 'Orders',
    slug: 'orders',
    icon: 'ShoppingCart',
    description: 'Orders, payments, and invoices',
    types: orderTypes,
  },
  {
    name: 'Media',
    slug: 'media',
    icon: 'Image',
    description: 'Images and file uploads',
    types: mediaTypes,
  },
  {
    name: 'Webhooks',
    slug: 'webhooks',
    icon: 'Webhook',
    description: 'Action hooks and API keys',
    types: webhookTypes,
  },
  {
    name: 'Config',
    slug: 'config',
    icon: 'Settings',
    description: 'Metadata, fees, and settings',
    types: configTypes,
  },
  {
    name: 'Live',
    slug: 'live',
    icon: 'Radio',
    description: 'Live streaming and auctions',
    types: liveTypes,
  },
  {
    name: 'Core',
    slug: 'core',
    icon: 'Database',
    description: 'Core types and scalars',
    types: coreTypes,
  },
];

// Get all types combined
export const allBastaTypes: BastaType[] = bastaSections.flatMap(section => section.types);

// Type counts by category
export const typeCounts = {
  total: allBastaTypes.length,
  byCategory: allBastaTypes.reduce((acc, type) => {
    acc[type.category] = (acc[type.category] || 0) + 1;
    return acc;
  }, {} as Record<TypeCategory, number>),
  bySection: bastaSections.reduce((acc, section) => {
    acc[section.slug] = section.types.length;
    return acc;
  }, {} as Record<string, number>),
};

// Helper to get types by category
export function getTypesByCategory(category: TypeCategory): BastaType[] {
  return allBastaTypes.filter(type => type.category === category);
}

// Helper to get types by section
export function getTypesBySection(sectionSlug: string): BastaType[] {
  const section = bastaSections.find(s => s.slug === sectionSlug);
  return section?.types || [];
}

// Helper to search types
export function searchTypes(query: string): BastaType[] {
  const lowerQuery = query.toLowerCase();
  return allBastaTypes.filter(
    type =>
      type.name.toLowerCase().includes(lowerQuery) ||
      type.description.toLowerCase().includes(lowerQuery)
  );
}

// Combined type that works with both APIs
export type UnifiedBastaType = BastaType & {
  apiSource: ApiSource;
};
