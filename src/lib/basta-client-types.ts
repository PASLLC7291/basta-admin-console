// BASTA GraphQL Client API - Complete Type Catalog
// User-facing API with 112 types for real-time subscriptions, payments, search, and bidding

export type ClientTypeCategory =
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

export interface BastaClientType {
  name: string;
  category: ClientTypeCategory;
  description: string;
  fields?: string[];
  section: string;
  icon?: string;
  isSubscription?: boolean;
}

export interface BastaClientSection {
  name: string;
  slug: string;
  icon: string;
  description: string;
  types: BastaClientType[];
}

// ============================================
// SECTION 1: CORE QUERY TYPES (8 types)
// ============================================
export const coreQueryTypes: BastaClientType[] = [
  { name: 'Account', category: 'Object', description: 'Account information accessible to clients', fields: ['id', 'name', 'description', 'handle', 'imageUrl'], section: 'core-query', icon: '🏢' },
  { name: 'Me', category: 'Object', description: 'Current authenticated user\'s profile and data', fields: ['id', 'email', 'name', 'address', 'paddle', 'bids'], section: 'core-query', icon: '👤' },
  { name: 'ServerTime', category: 'Object', description: 'Server timestamp for client synchronization', fields: ['timestamp', 'timezone', 'offset'], section: 'core-query', icon: '⏰' },
  { name: 'Node', category: 'Interface', description: 'Base interface for all graph nodes with ID field', fields: ['id'], section: 'core-query', icon: '🔗' },
  { name: 'PageInfo', category: 'Object', description: 'Pagination cursor information for connections', fields: ['hasNextPage', 'hasPreviousPage', 'startCursor', 'endCursor'], section: 'core-query', icon: '📄' },
  { name: 'PaginationDirection', category: 'Enum', description: 'Direction for pagination: FORWARD or BACKWARD', section: 'core-query', icon: '↔️' },
  { name: 'Permission', category: 'Enum', description: 'User permission levels: READ, WRITE, BID, ADMIN', section: 'core-query', icon: '🔐' },
  { name: 'RenderMode', category: 'Enum', description: 'UI rendering modes: FULL, EMBEDDED, MINIMAL', section: 'core-query', icon: '🎨' },
];

// ============================================
// SECTION 2: SALES & AUCTIONS (15 types)
// ============================================
export const saleClientTypes: BastaClientType[] = [
  { name: 'Sale', category: 'Object', description: 'Auction/sale event visible to bidders', fields: ['id', 'title', 'description', 'status', 'dates', 'items', 'registration'], section: 'sales', icon: '🎪' },
  { name: 'SaleConnection', category: 'Connection', description: 'Paginated list of sales with cursor-based pagination', fields: ['edges', 'pageInfo', 'totalCount'], section: 'sales', icon: '📋' },
  { name: 'SalesEdge', category: 'Edge', description: 'Sale node with cursor in paginated connection', fields: ['node', 'cursor'], section: 'sales', icon: '➡️' },
  { name: 'SaleDates', category: 'Object', description: 'Sale timing: open, close, and publish dates', fields: ['openDate', 'closeDate', 'publishDate', 'timezone'], section: 'sales', icon: '📅' },
  { name: 'SaleFilter', category: 'Input', description: 'Filter sales by status, type, and date range', fields: ['status', 'type', 'dateFrom', 'dateTo', 'accountId'], section: 'sales', icon: '🔍' },
  { name: 'SaleItemFilter', category: 'Input', description: 'Filter items within a specific sale', fields: ['status', 'hasReserve', 'hasBids', 'category'], section: 'sales', icon: '🔍' },
  { name: 'SaleStatus', category: 'Enum', description: 'Sale lifecycle states: DRAFT, PUBLISHED, OPEN, CLOSING, CLOSED', section: 'sales', icon: '🚦' },
  { name: 'SaleType', category: 'Enum', description: 'Auction format: TIMED, LIVE, HYBRID', section: 'sales', icon: '🏷️' },
  { name: 'ClosingMethod', category: 'Enum', description: 'How sale closes: HARD_CLOSE, SOFT_CLOSE, STAGGERED', section: 'sales', icon: '⏱️' },
  { name: 'SaleActivity', category: 'Object', description: 'Recent sale activity feed with bid updates', fields: ['id', 'type', 'timestamp', 'item', 'bid'], section: 'sales', icon: '📊' },
  { name: 'SaleChanged', category: 'Subscription', description: 'Real-time subscription for sale status updates', fields: ['id', 'status', 'closingTime', 'activeItems'], section: 'sales', icon: '🔔', isSubscription: true },
  { name: 'SaleRegistrationStatus', category: 'Enum', description: 'Registration approval status: PENDING, APPROVED, REJECTED', section: 'sales', icon: '✅' },
  { name: 'SaleRegistrationType', category: 'Enum', description: 'Registration tiers: STANDARD, VIP, DEALER', section: 'sales', icon: '📝' },
  { name: 'UserSaleRegistration', category: 'Object', description: 'User\'s registration details for a specific sale', fields: ['id', 'sale', 'status', 'paddle', 'registeredAt'], section: 'sales', icon: '🎫' },
  { name: 'SequenceNumber', category: 'Object', description: 'Sale sequence number for ordering', fields: ['prefix', 'number', 'formatted'], section: 'sales', icon: '🔢' },
];

// ============================================
// SECTION 3: ITEMS & LOTS (22 types)
// ============================================
export const itemClientTypes: BastaClientType[] = [
  { name: 'Item', category: 'Object', description: 'Auction item/lot with bidding details', fields: ['id', 'title', 'description', 'currentBid', 'bidCount', 'status', 'images'], section: 'items', icon: '📦' },
  { name: 'ItemsConnection', category: 'Connection', description: 'Paginated items with cursor-based navigation', fields: ['edges', 'pageInfo', 'totalCount'], section: 'items', icon: '📋' },
  { name: 'ItemsEdge', category: 'Edge', description: 'Item node with cursor in connection', fields: ['node', 'cursor'], section: 'items', icon: '➡️' },
  { name: 'ItemDates', category: 'Object', description: 'Item-specific open and closing times', fields: ['openDate', 'closeDate', 'extendedTo'], section: 'items', icon: '📅' },
  { name: 'ItemIdsFilter', category: 'Input', description: 'Filter items by specific ID list', fields: ['ids', 'excludeIds'], section: 'items', icon: '🔍' },
  { name: 'ItemOrderField', category: 'Enum', description: 'Sort field: LOT_NUMBER, CURRENT_BID, BID_COUNT, CLOSING_TIME', section: 'items', icon: '📊' },
  { name: 'ItemOrderInput', category: 'Input', description: 'Sort configuration for items', fields: ['field', 'direction'], section: 'items', icon: '↕️' },
  { name: 'ItemSpecifications', category: 'Object', description: 'Physical specifications: dimensions, weight, condition', fields: ['dimensions', 'weight', 'condition', 'materials'], section: 'items', icon: '📐' },
  { name: 'ItemStatus', category: 'Enum', description: 'Item lifecycle: ACTIVE, SOLD, PASSED, WITHDRAWN', section: 'items', icon: '🚦' },
  { name: 'ItemNotification', category: 'Object', description: 'Base notification type for item alerts', fields: ['id', 'type', 'message', 'timestamp'], section: 'items', icon: '🔔' },
  { name: 'ItemFairWarningNotification', category: 'Object', description: 'Fair warning alert before item closes', fields: ['id', 'item', 'message', 'timeRemaining'], section: 'items', icon: '⚠️' },
  { name: 'ItemMessageNotification', category: 'Object', description: 'Auctioneer message notification', fields: ['id', 'item', 'message', 'from'], section: 'items', icon: '💬' },
  { name: 'ItemChanged', category: 'Subscription', description: 'Real-time subscription for item bid/status updates', fields: ['id', 'currentBid', 'bidCount', 'status', 'leadingBidderId'], section: 'items', icon: '🔔', isSubscription: true },
  { name: 'CurrentItem', category: 'Object', description: 'Currently active item in live auction', fields: ['item', 'startedAt', 'currentBid', 'askingPrice'], section: 'items', icon: '🎯' },
  { name: 'LiveItem', category: 'Object', description: 'Item being auctioned in live sale', fields: ['item', 'status', 'currentBid', 'hammer'], section: 'items', icon: '🔴' },
  { name: 'Estimate', category: 'Object', description: 'Price estimate range for item', fields: ['low', 'high', 'currency'], section: 'items', icon: '💰' },
  { name: 'Link', category: 'Object', description: 'External link/document attached to item', fields: ['url', 'title', 'type'], section: 'items', icon: '🔗' },
  { name: 'LinkType', category: 'Enum', description: 'Link categories: EXTERNAL, VIDEO, DOCUMENT, CONDITION_REPORT', section: 'items', icon: '🏷️' },
  { name: 'SpecificationType', category: 'Enum', description: 'Specification type: DIMENSION, WEIGHT, MATERIAL, CONDITION', section: 'items', icon: '📐' },
  { name: 'SpecificationSubType', category: 'Enum', description: 'Specification subtype for detailed classification', section: 'items', icon: '📐' },
  { name: 'MeasurementUnit', category: 'Enum', description: 'Dimension units: CM, INCH, MM, M, FT', section: 'items', icon: '📏' },
  { name: 'WeightUnit', category: 'Enum', description: 'Weight units: KG, LB, G, OZ', section: 'items', icon: '⚖️' },
];

// ============================================
// SECTION 4: BIDDING (28 types)
// ============================================
export const bidClientTypes: BastaClientType[] = [
  { name: 'Bid', category: 'Object', description: 'Individual bid record with amount and status', fields: ['id', 'amount', 'bidder', 'timestamp', 'status'], section: 'bidding', icon: '🔨' },
  { name: 'BidPlaced', category: 'Union', description: 'Result union of bid placement: Success or Error', section: 'bidding', icon: '✨' },
  { name: 'BidPlacedSuccess', category: 'Object', description: 'Successful bid response with bid details', fields: ['bid', 'isLeading', 'message'], section: 'bidding', icon: '✅' },
  { name: 'BidPlacedError', category: 'Object', description: 'Failed bid with error code and message', fields: ['errorCode', 'message', 'minimumBid', 'currentBid'], section: 'bidding', icon: '❌' },
  { name: 'BidErrorCode', category: 'Enum', description: 'Error codes: OUTBID, CLOSED, BELOW_MINIMUM, NOT_REGISTERED, BLOCKED', section: 'bidding', icon: '⚠️' },
  { name: 'BidStatus', category: 'Enum', description: 'Bid states: WINNING, OUTBID, CANCELLED, RETRACTED', section: 'bidding', icon: '🚦' },
  { name: 'BidType', category: 'Enum', description: 'Bid types: REGULAR, MAX, ABSENTEE', section: 'bidding', icon: '🏷️' },
  { name: 'BidIncrementTable', category: 'Object', description: 'Bid increment rules by price range', fields: ['ranges', 'defaultIncrement', 'currency'], section: 'bidding', icon: '📊' },
  { name: 'BidOrigin', category: 'Object', description: 'Source of the bid (online, paddle, phone)', fields: ['type', 'details'], section: 'bidding', icon: '📍' },
  { name: 'BidOriginType', category: 'Enum', description: 'Origin types: ONLINE, PADDLE, PHONE, ABSENTEE', section: 'bidding', icon: '🏷️' },
  { name: 'OnlineBidOrigin', category: 'Object', description: 'Online bid source with platform details', fields: ['platform', 'ip', 'userAgent'], section: 'bidding', icon: '💻' },
  { name: 'PaddleBidOrigin', category: 'Object', description: 'In-room paddle bid details', fields: ['paddleNumber', 'clerkId', 'location'], section: 'bidding', icon: '🏓' },
  { name: 'PhoneBidOrigin', category: 'Object', description: 'Phone bid source details', fields: ['phoneNumber', 'operatorId', 'language'], section: 'bidding', icon: '📞' },
  { name: 'MaxBidPlaced', category: 'Union', description: 'Result of max/proxy bid placement', section: 'bidding', icon: '⬆️' },
  { name: 'MaxBidPlacedSuccess', category: 'Object', description: 'Successful max bid with proxy info', fields: ['maxBid', 'currentBid', 'isLeading'], section: 'bidding', icon: '✅' },
  { name: 'ReserveStatus', category: 'Enum', description: 'Reserve states: NOT_MET, MET, NO_RESERVE', section: 'bidding', icon: '🎯' },
  { name: 'UserBid', category: 'Object', description: 'User\'s bid with item context', fields: ['id', 'bid', 'item', 'sale', 'status', 'isLeading'], section: 'bidding', icon: '👤' },
  { name: 'UserBidsConnection', category: 'Connection', description: 'Paginated list of user\'s bids', fields: ['edges', 'pageInfo', 'totalCount'], section: 'bidding', icon: '📋' },
  { name: 'UserBidsEdge', category: 'Edge', description: 'User bid in paginated connection', fields: ['node', 'cursor'], section: 'bidding', icon: '➡️' },
  { name: 'GetUserBidsInput', category: 'Input', description: 'Filter options for user\'s bid history', fields: ['status', 'saleId', 'dateFrom', 'dateTo'], section: 'bidding', icon: '🔍' },
  { name: 'Paddle', category: 'Object', description: 'Bidding paddle assignment for user', fields: ['id', 'number', 'type', 'user', 'sale'], section: 'bidding', icon: '🏓' },
  { name: 'PaddleType', category: 'Enum', description: 'Paddle types: ONLINE, PHYSICAL, PHONE, VIP', section: 'bidding', icon: '🏷️' },
  { name: 'BidderVerificationInput', category: 'Input', description: 'Input for requesting bidder verification', fields: ['userId', 'documentType', 'returnUrl'], section: 'bidding', icon: '✅' },
  { name: 'BidderVerificationLink', category: 'Object', description: 'Verification URL for KYC process', fields: ['url', 'expiresAt', 'status'], section: 'bidding', icon: '🔗' },
  { name: 'PlaceBidInput', category: 'Input', description: 'Input for placing a bid on an item', fields: ['itemId', 'amount', 'maxBid'], section: 'bidding', icon: '📝' },
  { name: 'PlaceMaxBidInput', category: 'Input', description: 'Input for placing a maximum/proxy bid', fields: ['itemId', 'maxAmount'], section: 'bidding', icon: '📝' },
  { name: 'BidConfirmation', category: 'Object', description: 'Confirmation details after successful bid', fields: ['bid', 'item', 'isLeading', 'nextMinimum'], section: 'bidding', icon: '✅' },
  { name: 'BiddingActivity', category: 'Subscription', description: 'Real-time subscription for bidding activity', fields: ['itemId', 'bid', 'bidCount', 'leading'], section: 'bidding', icon: '🔔', isSubscription: true },
];

// ============================================
// SECTION 5: USER & IDENTITY (12 types)
// ============================================
export const userClientTypes: BastaClientType[] = [
  { name: 'UserProfile', category: 'Object', description: 'User profile information', fields: ['id', 'email', 'firstName', 'lastName', 'phone', 'address'], section: 'user', icon: '👤' },
  { name: 'UpdateUserInput', category: 'Input', description: 'Input for updating user profile', fields: ['firstName', 'lastName', 'phone', 'address'], section: 'user', icon: '✏️' },
  { name: 'MailingAddress', category: 'Object', description: 'User\'s mailing address', fields: ['line1', 'line2', 'city', 'state', 'postalCode', 'country'], section: 'user', icon: '📫' },
  { name: 'MailingAddressInput', category: 'Input', description: 'Input for setting mailing address', fields: ['line1', 'line2', 'city', 'state', 'postalCode', 'country'], section: 'user', icon: '📝' },
  { name: 'Country', category: 'Enum', description: 'ISO 3166-1 country codes', section: 'user', icon: '🌍' },
  { name: 'Card', category: 'Object', description: 'Saved payment card (masked)', fields: ['id', 'last4', 'brand', 'expiryMonth', 'expiryYear', 'isDefault'], section: 'user', icon: '💳' },
  { name: 'UserAccountSubscription', category: 'Subscription', description: 'Real-time subscription for user account changes', fields: ['id', 'balance', 'notifications', 'registrations'], section: 'user', icon: '🔔', isSubscription: true },
  { name: 'UserSaleItemSubscription', category: 'Subscription', description: 'Real-time subscription for watched items', fields: ['itemId', 'currentBid', 'status', 'isLeading'], section: 'user', icon: '🔔', isSubscription: true },
  { name: 'IdType', category: 'Enum', description: 'Identifier types: INTERNAL, EXTERNAL, SEQUENCE', section: 'user', icon: '🏷️' },
  { name: 'UserNotification', category: 'Object', description: 'User notification object', fields: ['id', 'type', 'message', 'read', 'createdAt'], section: 'user', icon: '🔔' },
  { name: 'NotificationType', category: 'Enum', description: 'Notification types: OUTBID, WON, REGISTRATION, PAYMENT', section: 'user', icon: '🏷️' },
  { name: 'UserPreferences', category: 'Object', description: 'User notification and display preferences', fields: ['emailNotifications', 'pushNotifications', 'currency', 'timezone'], section: 'user', icon: '⚙️' },
];

// ============================================
// SECTION 6: PAYMENTS & CHECKOUT (15 types)
// ============================================
export const paymentClientTypes: BastaClientType[] = [
  { name: 'PaymentDetails', category: 'Object', description: 'Payment configuration for account', fields: ['currency', 'acceptedMethods', 'stripeEnabled'], section: 'payments', icon: '💳' },
  { name: 'PaymentMethod', category: 'Object', description: 'Saved payment method', fields: ['id', 'type', 'last4', 'brand', 'isDefault'], section: 'payments', icon: '💰' },
  { name: 'PaymentSession', category: 'Object', description: 'Active checkout/payment session', fields: ['id', 'status', 'amount', 'items', 'expiresAt'], section: 'payments', icon: '🛒' },
  { name: 'PaymentSessionInput', category: 'Input', description: 'Input for creating payment session', fields: ['itemIds', 'paymentMethodId', 'returnUrl'], section: 'payments', icon: '📝' },
  { name: 'PaymentSessionStatus', category: 'Enum', description: 'Session states: PENDING, PROCESSING, COMPLETE, FAILED, EXPIRED', section: 'payments', icon: '🚦' },
  { name: 'PaymentProviderSession', category: 'Object', description: 'Provider-specific session data', fields: ['provider', 'sessionId', 'clientSecret'], section: 'payments', icon: '🔌' },
  { name: 'PaymentProviderSessionInput', category: 'Input', description: 'Input for creating provider session', fields: ['provider', 'amount', 'currency'], section: 'payments', icon: '📝' },
  { name: 'StripePaymentProviderSession', category: 'Object', description: 'Stripe-specific checkout session', fields: ['clientSecret', 'publishableKey', 'sessionId', 'paymentIntentId'], section: 'payments', icon: '💳' },
  { name: 'SetDefaultPaymentMethodInput', category: 'Input', description: 'Input to set default payment method', fields: ['paymentMethodId'], section: 'payments', icon: '⭐' },
  { name: 'PaymentIntent', category: 'Object', description: 'Payment intent for processing', fields: ['id', 'amount', 'status', 'clientSecret'], section: 'payments', icon: '💳' },
  { name: 'PaymentIntentStatus', category: 'Enum', description: 'Intent states: REQUIRES_PAYMENT, PROCESSING, SUCCEEDED, FAILED', section: 'payments', icon: '🚦' },
  { name: 'Invoice', category: 'Object', description: 'Invoice for won items', fields: ['id', 'number', 'items', 'subtotal', 'fees', 'total', 'dueDate'], section: 'payments', icon: '🧾' },
  { name: 'InvoiceItem', category: 'Object', description: 'Line item on invoice', fields: ['id', 'item', 'hammerPrice', 'buyerPremium', 'total'], section: 'payments', icon: '📋' },
  { name: 'CheckoutResult', category: 'Union', description: 'Result of checkout: Success or Error', section: 'payments', icon: '✨' },
  { name: 'CheckoutSuccess', category: 'Object', description: 'Successful checkout result', fields: ['order', 'receipt', 'confirmationNumber'], section: 'payments', icon: '✅' },
];

// ============================================
// SECTION 7: SEARCH & DISCOVERY (10 types)
// ============================================
export const searchDiscoveryTypes: BastaClientType[] = [
  { name: 'SearchResultConnection', category: 'Connection', description: 'Paginated search results', fields: ['edges', 'pageInfo', 'totalCount', 'facets'], section: 'search', icon: '🔍' },
  { name: 'SearchResultEdge', category: 'Edge', description: 'Search result node with cursor', fields: ['node', 'cursor', 'score'], section: 'search', icon: '➡️' },
  { name: 'SearchResultItem', category: 'Object', description: 'Individual search result with relevance', fields: ['item', 'sale', 'highlights', 'score'], section: 'search', icon: '📄' },
  { name: 'SearchPageInfo', category: 'Object', description: 'Search-specific pagination info', fields: ['hasNextPage', 'endCursor', 'totalPages'], section: 'search', icon: '📄' },
  { name: 'SearchType', category: 'Enum', description: 'Search scope: ITEMS, SALES, ALL', section: 'search', icon: '🏷️' },
  { name: 'FacetCount', category: 'Object', description: 'Facet with result count', fields: ['name', 'count', 'selected'], section: 'search', icon: '📊' },
  { name: 'FacetStats', category: 'Object', description: 'Facet statistics (min, max, avg)', fields: ['min', 'max', 'avg', 'sum'], section: 'search', icon: '📈' },
  { name: 'FacetValue', category: 'Object', description: 'Individual facet option value', fields: ['value', 'count', 'selected'], section: 'search', icon: '🏷️' },
  { name: 'SearchInput', category: 'Input', description: 'Search query and filter parameters', fields: ['query', 'type', 'filters', 'sort', 'facets'], section: 'search', icon: '🔍' },
  { name: 'Aggregator', category: 'Object', description: 'Aggregation helper for search results', fields: ['type', 'field', 'value'], section: 'search', icon: '📊' },
];

// ============================================
// SECTION 8: LIVE STREAMING (8 types)
// ============================================
export const liveClientTypes: BastaClientType[] = [
  { name: 'LiveStream', category: 'Object', description: 'Live stream information for sale', fields: ['id', 'url', 'type', 'status', 'startedAt'], section: 'live', icon: '🔴' },
  { name: 'LiveStreamType', category: 'Enum', description: 'Stream platform: BASTA, YOUTUBE, VIMEO, EXTERNAL', section: 'live', icon: '🏷️' },
  { name: 'BastaLiveStream', category: 'Object', description: 'BASTA-hosted live stream', fields: ['streamKey', 'playbackUrl', 'chatEnabled'], section: 'live', icon: '🎥' },
  { name: 'ExternalLiveStream', category: 'Object', description: 'Third-party embedded stream', fields: ['url', 'embedCode', 'provider'], section: 'live', icon: '🌐' },
  { name: 'LiveVideoStream', category: 'Object', description: 'Video stream technical details', fields: ['url', 'format', 'quality', 'latency'], section: 'live', icon: '📹' },
  { name: 'LiveAuctionState', category: 'Object', description: 'Current state of live auction', fields: ['currentItem', 'nextItems', 'activeBidders'], section: 'live', icon: '🎯' },
  { name: 'LiveStreamStatus', category: 'Enum', description: 'Stream states: SCHEDULED, LIVE, PAUSED, ENDED', section: 'live', icon: '🚦' },
  { name: 'AuctioneerMessage', category: 'Object', description: 'Message from auctioneer to bidders', fields: ['id', 'message', 'type', 'timestamp'], section: 'live', icon: '📣' },
];

// ============================================
// SECTION 9: METADATA (8 types)
// ============================================
export const metadataClientTypes: BastaClientType[] = [
  { name: 'Metafield', category: 'Object', description: 'Custom metadata field on entity', fields: ['id', 'key', 'value', 'type'], section: 'metadata', icon: '📎' },
  { name: 'MetafieldValueType', category: 'Enum', description: 'Value types: STRING, NUMBER, BOOLEAN, JSON, DATE', section: 'metadata', icon: '🏷️' },
  { name: 'MetafieldsConnection', category: 'Connection', description: 'Paginated list of metafields', fields: ['edges', 'pageInfo'], section: 'metadata', icon: '📋' },
  { name: 'MetafieldsEdge', category: 'Edge', description: 'Metafield in paginated connection', fields: ['node', 'cursor'], section: 'metadata', icon: '➡️' },
  { name: 'GetMetafieldInput', category: 'Input', description: 'Input to get single metafield', fields: ['entityId', 'key'], section: 'metadata', icon: '🔍' },
  { name: 'GetMetafieldsInput', category: 'Input', description: 'Input to get multiple metafields', fields: ['entityId', 'keys', 'namespace'], section: 'metadata', icon: '🔍' },
  { name: 'RangeRule', category: 'Object', description: 'Price range rule for increments/fees', fields: ['from', 'to', 'value', 'percentage'], section: 'metadata', icon: '📊' },
  { name: 'Image', category: 'Object', description: 'Image with multiple resolution URLs', fields: ['id', 'url', 'thumbnailUrl', 'width', 'height', 'alt'], section: 'metadata', icon: '🖼️' },
];

// ============================================
// SECTION 10: SCALARS (6 types)
// ============================================
export const scalarClientTypes: BastaClientType[] = [
  { name: 'Boolean', category: 'Scalar', description: 'Boolean true/false value', section: 'scalars', icon: '✓' },
  { name: 'String', category: 'Scalar', description: 'UTF-8 text string value', section: 'scalars', icon: '📝' },
  { name: 'Int', category: 'Scalar', description: 'Signed 32-bit integer', section: 'scalars', icon: '🔢' },
  { name: 'Float', category: 'Scalar', description: 'Signed double-precision floating-point', section: 'scalars', icon: '🔢' },
  { name: 'ID', category: 'Scalar', description: 'Unique identifier, serialized as string', section: 'scalars', icon: '🆔' },
  { name: 'DateTime', category: 'Scalar', description: 'ISO 8601 date-time string with timezone', section: 'scalars', icon: '📅' },
];

// ============================================
// ALL CLIENT API SECTIONS COMBINED
// ============================================
export const bastaClientSections: BastaClientSection[] = [
  {
    name: 'Core Query',
    slug: 'core-query',
    icon: 'Database',
    description: 'Core query types, pagination, and permissions',
    types: coreQueryTypes,
  },
  {
    name: 'Sales',
    slug: 'sales',
    icon: 'Gavel',
    description: 'Sales, auctions, and real-time sale subscriptions',
    types: saleClientTypes,
  },
  {
    name: 'Items',
    slug: 'items',
    icon: 'Package',
    description: 'Items, lots, specifications, and item subscriptions',
    types: itemClientTypes,
  },
  {
    name: 'Bidding',
    slug: 'bidding',
    icon: 'TrendingUp',
    description: 'Bids, paddles, verification, and bidding activity',
    types: bidClientTypes,
  },
  {
    name: 'User & Identity',
    slug: 'user',
    icon: 'User',
    description: 'User profiles, addresses, and account subscriptions',
    types: userClientTypes,
  },
  {
    name: 'Payments',
    slug: 'payments',
    icon: 'CreditCard',
    description: 'Stripe integration, payment sessions, and checkout',
    types: paymentClientTypes,
  },
  {
    name: 'Search',
    slug: 'search',
    icon: 'Search',
    description: 'Faceted search, discovery, and aggregations',
    types: searchDiscoveryTypes,
  },
  {
    name: 'Live Streaming',
    slug: 'live',
    icon: 'Radio',
    description: 'Live auction streams and real-time state',
    types: liveClientTypes,
  },
  {
    name: 'Metadata',
    slug: 'metadata',
    icon: 'Tag',
    description: 'Custom fields, images, and range rules',
    types: metadataClientTypes,
  },
  {
    name: 'Scalars',
    slug: 'scalars',
    icon: 'Hash',
    description: 'GraphQL scalar types',
    types: scalarClientTypes,
  },
];

// Get all client types combined
export const allClientTypes: BastaClientType[] = bastaClientSections.flatMap(section => section.types);

// Get subscription types only
export const subscriptionTypes: BastaClientType[] = allClientTypes.filter(type => type.isSubscription);

// Type counts for client API
export const clientTypeCounts = {
  total: allClientTypes.length,
  subscriptions: subscriptionTypes.length,
  byCategory: allClientTypes.reduce((acc, type) => {
    acc[type.category] = (acc[type.category] || 0) + 1;
    return acc;
  }, {} as Record<ClientTypeCategory, number>),
  bySection: bastaClientSections.reduce((acc, section) => {
    acc[section.slug] = section.types.length;
    return acc;
  }, {} as Record<string, number>),
};

// Helper to get client types by category
export function getClientTypesByCategory(category: ClientTypeCategory): BastaClientType[] {
  return allClientTypes.filter(type => type.category === category);
}

// Helper to get client types by section
export function getClientTypesBySection(sectionSlug: string): BastaClientType[] {
  const section = bastaClientSections.find(s => s.slug === sectionSlug);
  return section?.types || [];
}

// Helper to search client types
export function searchClientTypes(query: string): BastaClientType[] {
  const lowerQuery = query.toLowerCase();
  return allClientTypes.filter(
    type =>
      type.name.toLowerCase().includes(lowerQuery) ||
      type.description.toLowerCase().includes(lowerQuery)
  );
}

// Helper to get only subscription types
export function getSubscriptionTypes(): BastaClientType[] {
  return subscriptionTypes;
}
