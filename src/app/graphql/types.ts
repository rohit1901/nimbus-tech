export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  closing?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intro?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Value>>;
  valuesCount?: Maybe<Scalars['Int']['output']>;
  valuesTitle?: Maybe<Scalars['String']['output']>;
};


export type AboutValuesArgs = {
  cursor?: InputMaybe<ValueWhereUniqueInput>;
  orderBy?: Array<ValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ValueWhereInput;
};


export type AboutValuesCountArgs = {
  where?: ValueWhereInput;
};

export type AboutCreateInput = {
  closing?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  intro?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<ValueRelateToManyForCreateInput>;
  valuesTitle?: InputMaybe<Scalars['String']['input']>;
};

export type AboutOrderByInput = {
  closing?: InputMaybe<OrderDirection>;
  heading?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intro?: InputMaybe<OrderDirection>;
  valuesTitle?: InputMaybe<OrderDirection>;
};

export type AboutRelateToOneForCreateInput = {
  connect?: InputMaybe<AboutWhereUniqueInput>;
  create?: InputMaybe<AboutCreateInput>;
};

export type AboutRelateToOneForUpdateInput = {
  connect?: InputMaybe<AboutWhereUniqueInput>;
  create?: InputMaybe<AboutCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AboutUpdateArgs = {
  data: AboutUpdateInput;
  where: AboutWhereUniqueInput;
};

export type AboutUpdateInput = {
  closing?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  intro?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<ValueRelateToManyForUpdateInput>;
  valuesTitle?: InputMaybe<Scalars['String']['input']>;
};

export type AboutWhereInput = {
  AND?: InputMaybe<Array<AboutWhereInput>>;
  NOT?: InputMaybe<Array<AboutWhereInput>>;
  OR?: InputMaybe<Array<AboutWhereInput>>;
  closing?: InputMaybe<StringFilter>;
  heading?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  intro?: InputMaybe<StringFilter>;
  values?: InputMaybe<ValueManyRelationFilter>;
  valuesTitle?: InputMaybe<StringFilter>;
};

export type AboutWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Analytic = {
  __typename?: 'Analytic';
  heading?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  stats?: Maybe<AnalyticsStat>;
  subheading?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Array<AnalyticsSummaryItem>>;
  summaryCount?: Maybe<Scalars['Int']['output']>;
  tableHeadings?: Maybe<Array<Scalars['String']['output']>>;
};


export type AnalyticSummaryArgs = {
  cursor?: InputMaybe<AnalyticsSummaryItemWhereUniqueInput>;
  orderBy?: Array<AnalyticsSummaryItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AnalyticsSummaryItemWhereInput;
};


export type AnalyticSummaryCountArgs = {
  where?: AnalyticsSummaryItemWhereInput;
};

export type AnalyticCreateInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  stats?: InputMaybe<AnalyticsStatRelateToOneForCreateInput>;
  subheading?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<AnalyticsSummaryItemRelateToManyForCreateInput>;
  tableHeadings?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AnalyticOrderByInput = {
  heading?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  subheading?: InputMaybe<OrderDirection>;
};

export type AnalyticRelateToOneForCreateInput = {
  connect?: InputMaybe<AnalyticWhereUniqueInput>;
  create?: InputMaybe<AnalyticCreateInput>;
};

export type AnalyticRelateToOneForUpdateInput = {
  connect?: InputMaybe<AnalyticWhereUniqueInput>;
  create?: InputMaybe<AnalyticCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AnalyticUpdateArgs = {
  data: AnalyticUpdateInput;
  where: AnalyticWhereUniqueInput;
};

export type AnalyticUpdateInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  stats?: InputMaybe<AnalyticsStatRelateToOneForUpdateInput>;
  subheading?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<AnalyticsSummaryItemRelateToManyForUpdateInput>;
  tableHeadings?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AnalyticWhereInput = {
  AND?: InputMaybe<Array<AnalyticWhereInput>>;
  NOT?: InputMaybe<Array<AnalyticWhereInput>>;
  OR?: InputMaybe<Array<AnalyticWhereInput>>;
  heading?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  stats?: InputMaybe<AnalyticsStatWhereInput>;
  subheading?: InputMaybe<StringFilter>;
  summary?: InputMaybe<AnalyticsSummaryItemManyRelationFilter>;
};

export type AnalyticWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AnalyticsStat = {
  __typename?: 'AnalyticsStat';
  changePeriod?: Maybe<Scalars['String']['output']>;
  deploymentChange?: Maybe<Scalars['String']['output']>;
  deploymentChangePercent?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  totalDeployments?: Maybe<Scalars['String']['output']>;
};

export type AnalyticsStatCreateInput = {
  changePeriod?: InputMaybe<Scalars['String']['input']>;
  deploymentChange?: InputMaybe<Scalars['String']['input']>;
  deploymentChangePercent?: InputMaybe<Scalars['String']['input']>;
  totalDeployments?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsStatOrderByInput = {
  changePeriod?: InputMaybe<OrderDirection>;
  deploymentChange?: InputMaybe<OrderDirection>;
  deploymentChangePercent?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  totalDeployments?: InputMaybe<OrderDirection>;
};

export type AnalyticsStatRelateToOneForCreateInput = {
  connect?: InputMaybe<AnalyticsStatWhereUniqueInput>;
  create?: InputMaybe<AnalyticsStatCreateInput>;
};

export type AnalyticsStatRelateToOneForUpdateInput = {
  connect?: InputMaybe<AnalyticsStatWhereUniqueInput>;
  create?: InputMaybe<AnalyticsStatCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AnalyticsStatUpdateArgs = {
  data: AnalyticsStatUpdateInput;
  where: AnalyticsStatWhereUniqueInput;
};

export type AnalyticsStatUpdateInput = {
  changePeriod?: InputMaybe<Scalars['String']['input']>;
  deploymentChange?: InputMaybe<Scalars['String']['input']>;
  deploymentChangePercent?: InputMaybe<Scalars['String']['input']>;
  totalDeployments?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsStatWhereInput = {
  AND?: InputMaybe<Array<AnalyticsStatWhereInput>>;
  NOT?: InputMaybe<Array<AnalyticsStatWhereInput>>;
  OR?: InputMaybe<Array<AnalyticsStatWhereInput>>;
  changePeriod?: InputMaybe<StringFilter>;
  deploymentChange?: InputMaybe<StringFilter>;
  deploymentChangePercent?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  totalDeployments?: InputMaybe<StringFilter>;
};

export type AnalyticsStatWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AnalyticsSummaryItem = {
  __typename?: 'AnalyticsSummaryItem';
  bgColor?: Maybe<Scalars['String']['output']>;
  changeType?: Maybe<Scalars['String']['output']>;
  clientSatisfaction?: Maybe<Scalars['String']['output']>;
  deployments?: Maybe<Scalars['String']['output']>;
  efficiency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  revenueGrowth?: Maybe<Scalars['String']['output']>;
  uptime?: Maybe<Scalars['String']['output']>;
};

export type AnalyticsSummaryItemCreateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  changeType?: InputMaybe<Scalars['String']['input']>;
  clientSatisfaction?: InputMaybe<Scalars['String']['input']>;
  deployments?: InputMaybe<Scalars['String']['input']>;
  efficiency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  revenueGrowth?: InputMaybe<Scalars['String']['input']>;
  uptime?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsSummaryItemManyRelationFilter = {
  every?: InputMaybe<AnalyticsSummaryItemWhereInput>;
  none?: InputMaybe<AnalyticsSummaryItemWhereInput>;
  some?: InputMaybe<AnalyticsSummaryItemWhereInput>;
};

export type AnalyticsSummaryItemOrderByInput = {
  bgColor?: InputMaybe<OrderDirection>;
  changeType?: InputMaybe<OrderDirection>;
  clientSatisfaction?: InputMaybe<OrderDirection>;
  deployments?: InputMaybe<OrderDirection>;
  efficiency?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  revenueGrowth?: InputMaybe<OrderDirection>;
  uptime?: InputMaybe<OrderDirection>;
};

export type AnalyticsSummaryItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<AnalyticsSummaryItemWhereUniqueInput>>;
  create?: InputMaybe<Array<AnalyticsSummaryItemCreateInput>>;
};

export type AnalyticsSummaryItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<AnalyticsSummaryItemWhereUniqueInput>>;
  create?: InputMaybe<Array<AnalyticsSummaryItemCreateInput>>;
  disconnect?: InputMaybe<Array<AnalyticsSummaryItemWhereUniqueInput>>;
  set?: InputMaybe<Array<AnalyticsSummaryItemWhereUniqueInput>>;
};

export type AnalyticsSummaryItemUpdateArgs = {
  data: AnalyticsSummaryItemUpdateInput;
  where: AnalyticsSummaryItemWhereUniqueInput;
};

export type AnalyticsSummaryItemUpdateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  changeType?: InputMaybe<Scalars['String']['input']>;
  clientSatisfaction?: InputMaybe<Scalars['String']['input']>;
  deployments?: InputMaybe<Scalars['String']['input']>;
  efficiency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  revenueGrowth?: InputMaybe<Scalars['String']['input']>;
  uptime?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsSummaryItemWhereInput = {
  AND?: InputMaybe<Array<AnalyticsSummaryItemWhereInput>>;
  NOT?: InputMaybe<Array<AnalyticsSummaryItemWhereInput>>;
  OR?: InputMaybe<Array<AnalyticsSummaryItemWhereInput>>;
  bgColor?: InputMaybe<StringFilter>;
  changeType?: InputMaybe<StringFilter>;
  clientSatisfaction?: InputMaybe<StringFilter>;
  deployments?: InputMaybe<StringFilter>;
  efficiency?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  revenueGrowth?: InputMaybe<StringFilter>;
  uptime?: InputMaybe<StringFilter>;
};

export type AnalyticsSummaryItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Approach = {
  __typename?: 'Approach';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  steps?: Maybe<Array<ApproachStep>>;
  stepsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ApproachStepsArgs = {
  cursor?: InputMaybe<ApproachStepWhereUniqueInput>;
  orderBy?: Array<ApproachStepOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ApproachStepWhereInput;
};


export type ApproachStepsCountArgs = {
  where?: ApproachStepWhereInput;
};

export type ApproachCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<ApproachStepRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ApproachOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ApproachRelateToOneForCreateInput = {
  connect?: InputMaybe<ApproachWhereUniqueInput>;
  create?: InputMaybe<ApproachCreateInput>;
};

export type ApproachRelateToOneForUpdateInput = {
  connect?: InputMaybe<ApproachWhereUniqueInput>;
  create?: InputMaybe<ApproachCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApproachStep = {
  __typename?: 'ApproachStep';
  activityTime?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  stepId?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApproachStepCreateInput = {
  activityTime?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  stepId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ApproachStepManyRelationFilter = {
  every?: InputMaybe<ApproachStepWhereInput>;
  none?: InputMaybe<ApproachStepWhereInput>;
  some?: InputMaybe<ApproachStepWhereInput>;
};

export type ApproachStepOrderByInput = {
  activityTime?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  stepId?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type ApproachStepRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ApproachStepWhereUniqueInput>>;
  create?: InputMaybe<Array<ApproachStepCreateInput>>;
};

export type ApproachStepRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ApproachStepWhereUniqueInput>>;
  create?: InputMaybe<Array<ApproachStepCreateInput>>;
  disconnect?: InputMaybe<Array<ApproachStepWhereUniqueInput>>;
  set?: InputMaybe<Array<ApproachStepWhereUniqueInput>>;
};

export type ApproachStepUpdateArgs = {
  data: ApproachStepUpdateInput;
  where: ApproachStepWhereUniqueInput;
};

export type ApproachStepUpdateInput = {
  activityTime?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  stepId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ApproachStepWhereInput = {
  AND?: InputMaybe<Array<ApproachStepWhereInput>>;
  NOT?: InputMaybe<Array<ApproachStepWhereInput>>;
  OR?: InputMaybe<Array<ApproachStepWhereInput>>;
  activityTime?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  stepId?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type ApproachStepWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ApproachUpdateArgs = {
  data: ApproachUpdateInput;
  where: ApproachWhereUniqueInput;
};

export type ApproachUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<ApproachStepRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ApproachWhereInput = {
  AND?: InputMaybe<Array<ApproachWhereInput>>;
  NOT?: InputMaybe<Array<ApproachWhereInput>>;
  OR?: InputMaybe<Array<ApproachWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  steps?: InputMaybe<ApproachStepManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ApproachWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthenticatedItem = User;

export type Background = {
  __typename?: 'Background';
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  outerClassName?: Maybe<Scalars['String']['output']>;
};

export type BackgroundCreateInput = {
  image?: InputMaybe<ImageRelateToOneForCreateInput>;
  outerClassName?: InputMaybe<Scalars['String']['input']>;
};

export type BackgroundManyRelationFilter = {
  every?: InputMaybe<BackgroundWhereInput>;
  none?: InputMaybe<BackgroundWhereInput>;
  some?: InputMaybe<BackgroundWhereInput>;
};

export type BackgroundOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  outerClassName?: InputMaybe<OrderDirection>;
};

export type BackgroundRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<BackgroundWhereUniqueInput>>;
  create?: InputMaybe<Array<BackgroundCreateInput>>;
};

export type BackgroundRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<BackgroundWhereUniqueInput>>;
  create?: InputMaybe<Array<BackgroundCreateInput>>;
  disconnect?: InputMaybe<Array<BackgroundWhereUniqueInput>>;
  set?: InputMaybe<Array<BackgroundWhereUniqueInput>>;
};

export type BackgroundUpdateArgs = {
  data: BackgroundUpdateInput;
  where: BackgroundWhereUniqueInput;
};

export type BackgroundUpdateInput = {
  image?: InputMaybe<ImageRelateToOneForUpdateInput>;
  outerClassName?: InputMaybe<Scalars['String']['input']>;
};

export type BackgroundWhereInput = {
  AND?: InputMaybe<Array<BackgroundWhereInput>>;
  NOT?: InputMaybe<Array<BackgroundWhereInput>>;
  OR?: InputMaybe<Array<BackgroundWhereInput>>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageWhereInput>;
  outerClassName?: InputMaybe<StringFilter>;
};

export type BackgroundWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Benefit = {
  __typename?: 'Benefit';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type BenefitCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BenefitManyRelationFilter = {
  every?: InputMaybe<BenefitWhereInput>;
  none?: InputMaybe<BenefitWhereInput>;
  some?: InputMaybe<BenefitWhereInput>;
};

export type BenefitOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type BenefitRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<BenefitWhereUniqueInput>>;
  create?: InputMaybe<Array<BenefitCreateInput>>;
};

export type BenefitRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<BenefitWhereUniqueInput>>;
  create?: InputMaybe<Array<BenefitCreateInput>>;
  disconnect?: InputMaybe<Array<BenefitWhereUniqueInput>>;
  set?: InputMaybe<Array<BenefitWhereUniqueInput>>;
};

export type BenefitSection = {
  __typename?: 'BenefitSection';
  benefits?: Maybe<Array<Benefit>>;
  benefitsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type BenefitSectionBenefitsArgs = {
  cursor?: InputMaybe<BenefitWhereUniqueInput>;
  orderBy?: Array<BenefitOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BenefitWhereInput;
};


export type BenefitSectionBenefitsCountArgs = {
  where?: BenefitWhereInput;
};

export type BenefitSectionCreateInput = {
  benefits?: InputMaybe<BenefitRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BenefitSectionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type BenefitSectionRelateToOneForCreateInput = {
  connect?: InputMaybe<BenefitSectionWhereUniqueInput>;
  create?: InputMaybe<BenefitSectionCreateInput>;
};

export type BenefitSectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<BenefitSectionWhereUniqueInput>;
  create?: InputMaybe<BenefitSectionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BenefitSectionUpdateArgs = {
  data: BenefitSectionUpdateInput;
  where: BenefitSectionWhereUniqueInput;
};

export type BenefitSectionUpdateInput = {
  benefits?: InputMaybe<BenefitRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BenefitSectionWhereInput = {
  AND?: InputMaybe<Array<BenefitSectionWhereInput>>;
  NOT?: InputMaybe<Array<BenefitSectionWhereInput>>;
  OR?: InputMaybe<Array<BenefitSectionWhereInput>>;
  benefits?: InputMaybe<BenefitManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BenefitSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BenefitUpdateArgs = {
  data: BenefitUpdateInput;
  where: BenefitWhereUniqueInput;
};

export type BenefitUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BenefitWhereInput = {
  AND?: InputMaybe<Array<BenefitWhereInput>>;
  NOT?: InputMaybe<Array<BenefitWhereInput>>;
  OR?: InputMaybe<Array<BenefitWhereInput>>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BenefitWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Certification = {
  __typename?: 'Certification';
  certId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  link?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CertificationCreateInput = {
  certId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForCreateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CertificationManyRelationFilter = {
  every?: InputMaybe<CertificationWhereInput>;
  none?: InputMaybe<CertificationWhereInput>;
  some?: InputMaybe<CertificationWhereInput>;
};

export type CertificationOrderByInput = {
  certId?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CertificationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CertificationWhereUniqueInput>>;
  create?: InputMaybe<Array<CertificationCreateInput>>;
};

export type CertificationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CertificationWhereUniqueInput>>;
  create?: InputMaybe<Array<CertificationCreateInput>>;
  disconnect?: InputMaybe<Array<CertificationWhereUniqueInput>>;
  set?: InputMaybe<Array<CertificationWhereUniqueInput>>;
};

export type CertificationSection = {
  __typename?: 'CertificationSection';
  certifications?: Maybe<Array<Certification>>;
  certificationsCount?: Maybe<Scalars['Int']['output']>;
  cta?: Maybe<Cta>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type CertificationSectionCertificationsArgs = {
  cursor?: InputMaybe<CertificationWhereUniqueInput>;
  orderBy?: Array<CertificationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CertificationWhereInput;
};


export type CertificationSectionCertificationsCountArgs = {
  where?: CertificationWhereInput;
};

export type CertificationSectionCreateInput = {
  certifications?: InputMaybe<CertificationRelateToManyForCreateInput>;
  cta?: InputMaybe<CtaRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CertificationSectionOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CertificationSectionRelateToOneForCreateInput = {
  connect?: InputMaybe<CertificationSectionWhereUniqueInput>;
  create?: InputMaybe<CertificationSectionCreateInput>;
};

export type CertificationSectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<CertificationSectionWhereUniqueInput>;
  create?: InputMaybe<CertificationSectionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CertificationSectionUpdateArgs = {
  data: CertificationSectionUpdateInput;
  where: CertificationSectionWhereUniqueInput;
};

export type CertificationSectionUpdateInput = {
  certifications?: InputMaybe<CertificationRelateToManyForUpdateInput>;
  cta?: InputMaybe<CtaRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CertificationSectionWhereInput = {
  AND?: InputMaybe<Array<CertificationSectionWhereInput>>;
  NOT?: InputMaybe<Array<CertificationSectionWhereInput>>;
  OR?: InputMaybe<Array<CertificationSectionWhereInput>>;
  certifications?: InputMaybe<CertificationManyRelationFilter>;
  cta?: InputMaybe<CtaWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CertificationSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CertificationUpdateArgs = {
  data: CertificationUpdateInput;
  where: CertificationWhereUniqueInput;
};

export type CertificationUpdateInput = {
  certId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForUpdateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CertificationWhereInput = {
  AND?: InputMaybe<Array<CertificationWhereInput>>;
  NOT?: InputMaybe<Array<CertificationWhereInput>>;
  OR?: InputMaybe<Array<CertificationWhereInput>>;
  certId?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageWhereInput>;
  link?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CertificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Cta = {
  __typename?: 'Cta';
  external?: Maybe<Scalars['Boolean']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type CtaCreateInput = {
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type CtaManyRelationFilter = {
  every?: InputMaybe<CtaWhereInput>;
  none?: InputMaybe<CtaWhereInput>;
  some?: InputMaybe<CtaWhereInput>;
};

export type CtaOrderByInput = {
  external?: InputMaybe<OrderDirection>;
  href?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type CtaRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CtaWhereUniqueInput>>;
  create?: InputMaybe<Array<CtaCreateInput>>;
};

export type CtaRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CtaWhereUniqueInput>>;
  create?: InputMaybe<Array<CtaCreateInput>>;
  disconnect?: InputMaybe<Array<CtaWhereUniqueInput>>;
  set?: InputMaybe<Array<CtaWhereUniqueInput>>;
};

export type CtaRelateToOneForCreateInput = {
  connect?: InputMaybe<CtaWhereUniqueInput>;
  create?: InputMaybe<CtaCreateInput>;
};

export type CtaRelateToOneForUpdateInput = {
  connect?: InputMaybe<CtaWhereUniqueInput>;
  create?: InputMaybe<CtaCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CtaSection = {
  __typename?: 'CtaSection';
  background?: Maybe<Array<Background>>;
  backgroundCount?: Maybe<Scalars['Int']['output']>;
  ctas?: Maybe<Array<Cta>>;
  ctasCount?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type CtaSectionBackgroundArgs = {
  cursor?: InputMaybe<BackgroundWhereUniqueInput>;
  orderBy?: Array<BackgroundOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BackgroundWhereInput;
};


export type CtaSectionBackgroundCountArgs = {
  where?: BackgroundWhereInput;
};


export type CtaSectionCtasArgs = {
  cursor?: InputMaybe<CtaWhereUniqueInput>;
  orderBy?: Array<CtaOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CtaWhereInput;
};


export type CtaSectionCtasCountArgs = {
  where?: CtaWhereInput;
};

export type CtaSectionCreateInput = {
  background?: InputMaybe<BackgroundRelateToManyForCreateInput>;
  ctas?: InputMaybe<CtaRelateToManyForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CtaSectionOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CtaSectionRelateToOneForCreateInput = {
  connect?: InputMaybe<CtaSectionWhereUniqueInput>;
  create?: InputMaybe<CtaSectionCreateInput>;
};

export type CtaSectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<CtaSectionWhereUniqueInput>;
  create?: InputMaybe<CtaSectionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CtaSectionUpdateArgs = {
  data: CtaSectionUpdateInput;
  where: CtaSectionWhereUniqueInput;
};

export type CtaSectionUpdateInput = {
  background?: InputMaybe<BackgroundRelateToManyForUpdateInput>;
  ctas?: InputMaybe<CtaRelateToManyForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CtaSectionWhereInput = {
  AND?: InputMaybe<Array<CtaSectionWhereInput>>;
  NOT?: InputMaybe<Array<CtaSectionWhereInput>>;
  OR?: InputMaybe<Array<CtaSectionWhereInput>>;
  background?: InputMaybe<BackgroundManyRelationFilter>;
  ctas?: InputMaybe<CtaManyRelationFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CtaSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CtaUpdateArgs = {
  data: CtaUpdateInput;
  where: CtaWhereUniqueInput;
};

export type CtaUpdateInput = {
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type CtaWhereInput = {
  AND?: InputMaybe<Array<CtaWhereInput>>;
  NOT?: InputMaybe<Array<CtaWhereInput>>;
  OR?: InputMaybe<Array<CtaWhereInput>>;
  external?: InputMaybe<BooleanFilter>;
  href?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
};

export type CtaWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Faq = {
  __typename?: 'Faq';
  answer?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  question?: Maybe<Scalars['String']['output']>;
};

export type FaqCreateInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type FaqManyRelationFilter = {
  every?: InputMaybe<FaqWhereInput>;
  none?: InputMaybe<FaqWhereInput>;
  some?: InputMaybe<FaqWhereInput>;
};

export type FaqOrderByInput = {
  answer?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  question?: InputMaybe<OrderDirection>;
};

export type FaqRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<FaqWhereUniqueInput>>;
  create?: InputMaybe<Array<FaqCreateInput>>;
};

export type FaqRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<FaqWhereUniqueInput>>;
  create?: InputMaybe<Array<FaqCreateInput>>;
  disconnect?: InputMaybe<Array<FaqWhereUniqueInput>>;
  set?: InputMaybe<Array<FaqWhereUniqueInput>>;
};

export type FaqUpdateArgs = {
  data: FaqUpdateInput;
  where: FaqWhereUniqueInput;
};

export type FaqUpdateInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type FaqWhereInput = {
  AND?: InputMaybe<Array<FaqWhereInput>>;
  NOT?: InputMaybe<Array<FaqWhereInput>>;
  OR?: InputMaybe<Array<FaqWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  question?: InputMaybe<StringFilter>;
};

export type FaqWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Feature = {
  __typename?: 'Feature';
  description?: Maybe<Scalars['String']['output']>;
  featureId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  longDescription?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  visualization?: Maybe<Scalars['String']['output']>;
};

export type FeatureCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  featureId?: InputMaybe<Scalars['Int']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visualization?: InputMaybe<Scalars['String']['input']>;
};

export type FeatureManyRelationFilter = {
  every?: InputMaybe<FeatureWhereInput>;
  none?: InputMaybe<FeatureWhereInput>;
  some?: InputMaybe<FeatureWhereInput>;
};

export type FeatureOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  featureId?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  longDescription?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  visualization?: InputMaybe<OrderDirection>;
};

export type FeatureRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<FeatureWhereUniqueInput>>;
  create?: InputMaybe<Array<FeatureCreateInput>>;
};

export type FeatureRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<FeatureWhereUniqueInput>>;
  create?: InputMaybe<Array<FeatureCreateInput>>;
  disconnect?: InputMaybe<Array<FeatureWhereUniqueInput>>;
  set?: InputMaybe<Array<FeatureWhereUniqueInput>>;
};

export type FeatureUpdateArgs = {
  data: FeatureUpdateInput;
  where: FeatureWhereUniqueInput;
};

export type FeatureUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  featureId?: InputMaybe<Scalars['Int']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visualization?: InputMaybe<Scalars['String']['input']>;
};

export type FeatureWhereInput = {
  AND?: InputMaybe<Array<FeatureWhereInput>>;
  NOT?: InputMaybe<Array<FeatureWhereInput>>;
  OR?: InputMaybe<Array<FeatureWhereInput>>;
  description?: InputMaybe<StringFilter>;
  featureId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IdFilter>;
  longDescription?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  visualization?: InputMaybe<StringNullableFilter>;
};

export type FeatureWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Footer = {
  __typename?: 'Footer';
  id: Scalars['ID']['output'];
  languages?: Maybe<Array<Language>>;
  languagesCount?: Maybe<Scalars['Int']['output']>;
  sections?: Maybe<Array<FooterSection>>;
  sectionsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type FooterLanguagesArgs = {
  cursor?: InputMaybe<LanguageWhereUniqueInput>;
  orderBy?: Array<LanguageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LanguageWhereInput;
};


export type FooterLanguagesCountArgs = {
  where?: LanguageWhereInput;
};


export type FooterSectionsArgs = {
  cursor?: InputMaybe<FooterSectionWhereUniqueInput>;
  orderBy?: Array<FooterSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FooterSectionWhereInput;
};


export type FooterSectionsCountArgs = {
  where?: FooterSectionWhereInput;
};

export type FooterCreateInput = {
  languages?: InputMaybe<LanguageRelateToManyForCreateInput>;
  sections?: InputMaybe<FooterSectionRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FooterOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type FooterRelateToOneForCreateInput = {
  connect?: InputMaybe<FooterWhereUniqueInput>;
  create?: InputMaybe<FooterCreateInput>;
};

export type FooterRelateToOneForUpdateInput = {
  connect?: InputMaybe<FooterWhereUniqueInput>;
  create?: InputMaybe<FooterCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FooterSection = {
  __typename?: 'FooterSection';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<NavigationLink>>;
  itemsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type FooterSectionItemsArgs = {
  cursor?: InputMaybe<NavigationLinkWhereUniqueInput>;
  orderBy?: Array<NavigationLinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NavigationLinkWhereInput;
};


export type FooterSectionItemsCountArgs = {
  where?: NavigationLinkWhereInput;
};

export type FooterSectionCreateInput = {
  items?: InputMaybe<NavigationLinkRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FooterSectionManyRelationFilter = {
  every?: InputMaybe<FooterSectionWhereInput>;
  none?: InputMaybe<FooterSectionWhereInput>;
  some?: InputMaybe<FooterSectionWhereInput>;
};

export type FooterSectionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type FooterSectionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<FooterSectionWhereUniqueInput>>;
  create?: InputMaybe<Array<FooterSectionCreateInput>>;
};

export type FooterSectionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<FooterSectionWhereUniqueInput>>;
  create?: InputMaybe<Array<FooterSectionCreateInput>>;
  disconnect?: InputMaybe<Array<FooterSectionWhereUniqueInput>>;
  set?: InputMaybe<Array<FooterSectionWhereUniqueInput>>;
};

export type FooterSectionUpdateArgs = {
  data: FooterSectionUpdateInput;
  where: FooterSectionWhereUniqueInput;
};

export type FooterSectionUpdateInput = {
  items?: InputMaybe<NavigationLinkRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FooterSectionWhereInput = {
  AND?: InputMaybe<Array<FooterSectionWhereInput>>;
  NOT?: InputMaybe<Array<FooterSectionWhereInput>>;
  OR?: InputMaybe<Array<FooterSectionWhereInput>>;
  id?: InputMaybe<IdFilter>;
  items?: InputMaybe<NavigationLinkManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FooterSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FooterUpdateArgs = {
  data: FooterUpdateInput;
  where: FooterWhereUniqueInput;
};

export type FooterUpdateInput = {
  languages?: InputMaybe<LanguageRelateToManyForUpdateInput>;
  sections?: InputMaybe<FooterSectionRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FooterWhereInput = {
  AND?: InputMaybe<Array<FooterWhereInput>>;
  NOT?: InputMaybe<Array<FooterWhereInput>>;
  OR?: InputMaybe<Array<FooterWhereInput>>;
  id?: InputMaybe<IdFilter>;
  languages?: InputMaybe<LanguageManyRelationFilter>;
  sections?: InputMaybe<FooterSectionManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FooterWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Hero = {
  __typename?: 'Hero';
  banner?: Maybe<HeroBanner>;
  id: Scalars['ID']['output'];
  subHeading?: Maybe<Scalars['String']['output']>;
};

export type HeroBanner = {
  __typename?: 'HeroBanner';
  additional?: Maybe<HeroBannerAdditional>;
  external?: Maybe<Scalars['Boolean']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type HeroBannerAdditional = {
  __typename?: 'HeroBannerAdditional';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type HeroBannerAdditionalCreateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type HeroBannerAdditionalOrderByInput = {
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  text?: InputMaybe<OrderDirection>;
};

export type HeroBannerAdditionalRelateToOneForCreateInput = {
  connect?: InputMaybe<HeroBannerAdditionalWhereUniqueInput>;
  create?: InputMaybe<HeroBannerAdditionalCreateInput>;
};

export type HeroBannerAdditionalRelateToOneForUpdateInput = {
  connect?: InputMaybe<HeroBannerAdditionalWhereUniqueInput>;
  create?: InputMaybe<HeroBannerAdditionalCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HeroBannerAdditionalUpdateArgs = {
  data: HeroBannerAdditionalUpdateInput;
  where: HeroBannerAdditionalWhereUniqueInput;
};

export type HeroBannerAdditionalUpdateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type HeroBannerAdditionalWhereInput = {
  AND?: InputMaybe<Array<HeroBannerAdditionalWhereInput>>;
  NOT?: InputMaybe<Array<HeroBannerAdditionalWhereInput>>;
  OR?: InputMaybe<Array<HeroBannerAdditionalWhereInput>>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  text?: InputMaybe<StringFilter>;
};

export type HeroBannerAdditionalWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type HeroBannerCreateInput = {
  additional?: InputMaybe<HeroBannerAdditionalRelateToOneForCreateInput>;
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type HeroBannerOrderByInput = {
  external?: InputMaybe<OrderDirection>;
  href?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type HeroBannerRelateToOneForCreateInput = {
  connect?: InputMaybe<HeroBannerWhereUniqueInput>;
  create?: InputMaybe<HeroBannerCreateInput>;
};

export type HeroBannerRelateToOneForUpdateInput = {
  connect?: InputMaybe<HeroBannerWhereUniqueInput>;
  create?: InputMaybe<HeroBannerCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HeroBannerUpdateArgs = {
  data: HeroBannerUpdateInput;
  where: HeroBannerWhereUniqueInput;
};

export type HeroBannerUpdateInput = {
  additional?: InputMaybe<HeroBannerAdditionalRelateToOneForUpdateInput>;
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type HeroBannerWhereInput = {
  AND?: InputMaybe<Array<HeroBannerWhereInput>>;
  NOT?: InputMaybe<Array<HeroBannerWhereInput>>;
  OR?: InputMaybe<Array<HeroBannerWhereInput>>;
  additional?: InputMaybe<HeroBannerAdditionalWhereInput>;
  external?: InputMaybe<BooleanFilter>;
  href?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
};

export type HeroBannerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type HeroCreateInput = {
  banner?: InputMaybe<HeroBannerRelateToOneForCreateInput>;
  subHeading?: InputMaybe<Scalars['String']['input']>;
};

export type HeroOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  subHeading?: InputMaybe<OrderDirection>;
};

export type HeroRelateToOneForCreateInput = {
  connect?: InputMaybe<HeroWhereUniqueInput>;
  create?: InputMaybe<HeroCreateInput>;
};

export type HeroRelateToOneForUpdateInput = {
  connect?: InputMaybe<HeroWhereUniqueInput>;
  create?: InputMaybe<HeroCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HeroUpdateArgs = {
  data: HeroUpdateInput;
  where: HeroWhereUniqueInput;
};

export type HeroUpdateInput = {
  banner?: InputMaybe<HeroBannerRelateToOneForUpdateInput>;
  subHeading?: InputMaybe<Scalars['String']['input']>;
};

export type HeroWhereInput = {
  AND?: InputMaybe<Array<HeroWhereInput>>;
  NOT?: InputMaybe<Array<HeroWhereInput>>;
  OR?: InputMaybe<Array<HeroWhereInput>>;
  banner?: InputMaybe<HeroBannerWhereInput>;
  id?: InputMaybe<IdFilter>;
  subHeading?: InputMaybe<StringFilter>;
};

export type HeroWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']['output']>;
  className?: Maybe<Scalars['String']['output']>;
  fill?: Maybe<Scalars['Boolean']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  src?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ImageCreateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  className?: InputMaybe<Scalars['String']['input']>;
  fill?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageOrderByInput = {
  alt?: InputMaybe<OrderDirection>;
  className?: InputMaybe<OrderDirection>;
  fill?: InputMaybe<OrderDirection>;
  height?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  src?: InputMaybe<OrderDirection>;
  width?: InputMaybe<OrderDirection>;
};

export type ImageRelateToOneForCreateInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  create?: InputMaybe<ImageCreateInput>;
};

export type ImageRelateToOneForUpdateInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  create?: InputMaybe<ImageCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImageUpdateArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  className?: InputMaybe<Scalars['String']['input']>;
  fill?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  alt?: InputMaybe<StringFilter>;
  className?: InputMaybe<StringFilter>;
  fill?: InputMaybe<BooleanFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  src?: InputMaybe<StringFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type ImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type LanguageCreateInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type LanguageManyRelationFilter = {
  every?: InputMaybe<LanguageWhereInput>;
  none?: InputMaybe<LanguageWhereInput>;
  some?: InputMaybe<LanguageWhereInput>;
};

export type LanguageOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type LanguageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LanguageWhereUniqueInput>>;
  create?: InputMaybe<Array<LanguageCreateInput>>;
};

export type LanguageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LanguageWhereUniqueInput>>;
  create?: InputMaybe<Array<LanguageCreateInput>>;
  disconnect?: InputMaybe<Array<LanguageWhereUniqueInput>>;
  set?: InputMaybe<Array<LanguageWhereUniqueInput>>;
};

export type LanguageUpdateArgs = {
  data: LanguageUpdateInput;
  where: LanguageWhereUniqueInput;
};

export type LanguageUpdateInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type LanguageWhereInput = {
  AND?: InputMaybe<Array<LanguageWhereInput>>;
  NOT?: InputMaybe<Array<LanguageWhereInput>>;
  OR?: InputMaybe<Array<LanguageWhereInput>>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type LanguageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Map = {
  __typename?: 'Map';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subheading?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MapCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MapOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  subheading?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type MapRelateToOneForCreateInput = {
  connect?: InputMaybe<MapWhereUniqueInput>;
  create?: InputMaybe<MapCreateInput>;
};

export type MapRelateToOneForUpdateInput = {
  connect?: InputMaybe<MapWhereUniqueInput>;
  create?: InputMaybe<MapCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MapUpdateArgs = {
  data: MapUpdateInput;
  where: MapWhereUniqueInput;
};

export type MapUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MapWhereInput = {
  AND?: InputMaybe<Array<MapWhereInput>>;
  NOT?: InputMaybe<Array<MapWhereInput>>;
  OR?: InputMaybe<Array<MapWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  subheading?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MapWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createAbout?: Maybe<About>;
  createAbouts?: Maybe<Array<Maybe<About>>>;
  createAnalytic?: Maybe<Analytic>;
  createAnalytics?: Maybe<Array<Maybe<Analytic>>>;
  createAnalyticsStat?: Maybe<AnalyticsStat>;
  createAnalyticsStats?: Maybe<Array<Maybe<AnalyticsStat>>>;
  createAnalyticsSummaryItem?: Maybe<AnalyticsSummaryItem>;
  createAnalyticsSummaryItems?: Maybe<Array<Maybe<AnalyticsSummaryItem>>>;
  createApproach?: Maybe<Approach>;
  createApproachStep?: Maybe<ApproachStep>;
  createApproachSteps?: Maybe<Array<Maybe<ApproachStep>>>;
  createApproaches?: Maybe<Array<Maybe<Approach>>>;
  createBackground?: Maybe<Background>;
  createBackgrounds?: Maybe<Array<Maybe<Background>>>;
  createBenefit?: Maybe<Benefit>;
  createBenefitSection?: Maybe<BenefitSection>;
  createBenefitSections?: Maybe<Array<Maybe<BenefitSection>>>;
  createBenefits?: Maybe<Array<Maybe<Benefit>>>;
  createCertification?: Maybe<Certification>;
  createCertificationSection?: Maybe<CertificationSection>;
  createCertificationSections?: Maybe<Array<Maybe<CertificationSection>>>;
  createCertifications?: Maybe<Array<Maybe<Certification>>>;
  createCta?: Maybe<Cta>;
  createCtaSection?: Maybe<CtaSection>;
  createCtaSections?: Maybe<Array<Maybe<CtaSection>>>;
  createCtas?: Maybe<Array<Maybe<Cta>>>;
  createFaq?: Maybe<Faq>;
  createFaqs?: Maybe<Array<Maybe<Faq>>>;
  createFeature?: Maybe<Feature>;
  createFeatures?: Maybe<Array<Maybe<Feature>>>;
  createFooter?: Maybe<Footer>;
  createFooterSection?: Maybe<FooterSection>;
  createFooterSections?: Maybe<Array<Maybe<FooterSection>>>;
  createFooters?: Maybe<Array<Maybe<Footer>>>;
  createHero?: Maybe<Hero>;
  createHeroBanner?: Maybe<HeroBanner>;
  createHeroBannerAdditional?: Maybe<HeroBannerAdditional>;
  createHeroBannerAdditionals?: Maybe<Array<Maybe<HeroBannerAdditional>>>;
  createHeroBanners?: Maybe<Array<Maybe<HeroBanner>>>;
  createHeroes?: Maybe<Array<Maybe<Hero>>>;
  createImage?: Maybe<Image>;
  createImages?: Maybe<Array<Maybe<Image>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createLanguage?: Maybe<Language>;
  createLanguages?: Maybe<Array<Maybe<Language>>>;
  createMap?: Maybe<Map>;
  createMaps?: Maybe<Array<Maybe<Map>>>;
  createNavigation?: Maybe<Navigation>;
  createNavigationLink?: Maybe<NavigationLink>;
  createNavigationLinks?: Maybe<Array<Maybe<NavigationLink>>>;
  createNavigations?: Maybe<Array<Maybe<Navigation>>>;
  createPageContent?: Maybe<PageContent>;
  createPageContents?: Maybe<Array<Maybe<PageContent>>>;
  createSection?: Maybe<Section>;
  createSections?: Maybe<Array<Maybe<Section>>>;
  createTestimonialBadge?: Maybe<TestimonialBadge>;
  createTestimonialBadges?: Maybe<Array<Maybe<TestimonialBadge>>>;
  createTestimonialItem?: Maybe<TestimonialItem>;
  createTestimonialItems?: Maybe<Array<Maybe<TestimonialItem>>>;
  createTestimonialSection?: Maybe<TestimonialSection>;
  createTestimonialSections?: Maybe<Array<Maybe<TestimonialSection>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  createValue?: Maybe<Value>;
  createValues?: Maybe<Array<Maybe<Value>>>;
  deleteAbout?: Maybe<About>;
  deleteAbouts?: Maybe<Array<Maybe<About>>>;
  deleteAnalytic?: Maybe<Analytic>;
  deleteAnalytics?: Maybe<Array<Maybe<Analytic>>>;
  deleteAnalyticsStat?: Maybe<AnalyticsStat>;
  deleteAnalyticsStats?: Maybe<Array<Maybe<AnalyticsStat>>>;
  deleteAnalyticsSummaryItem?: Maybe<AnalyticsSummaryItem>;
  deleteAnalyticsSummaryItems?: Maybe<Array<Maybe<AnalyticsSummaryItem>>>;
  deleteApproach?: Maybe<Approach>;
  deleteApproachStep?: Maybe<ApproachStep>;
  deleteApproachSteps?: Maybe<Array<Maybe<ApproachStep>>>;
  deleteApproaches?: Maybe<Array<Maybe<Approach>>>;
  deleteBackground?: Maybe<Background>;
  deleteBackgrounds?: Maybe<Array<Maybe<Background>>>;
  deleteBenefit?: Maybe<Benefit>;
  deleteBenefitSection?: Maybe<BenefitSection>;
  deleteBenefitSections?: Maybe<Array<Maybe<BenefitSection>>>;
  deleteBenefits?: Maybe<Array<Maybe<Benefit>>>;
  deleteCertification?: Maybe<Certification>;
  deleteCertificationSection?: Maybe<CertificationSection>;
  deleteCertificationSections?: Maybe<Array<Maybe<CertificationSection>>>;
  deleteCertifications?: Maybe<Array<Maybe<Certification>>>;
  deleteCta?: Maybe<Cta>;
  deleteCtaSection?: Maybe<CtaSection>;
  deleteCtaSections?: Maybe<Array<Maybe<CtaSection>>>;
  deleteCtas?: Maybe<Array<Maybe<Cta>>>;
  deleteFaq?: Maybe<Faq>;
  deleteFaqs?: Maybe<Array<Maybe<Faq>>>;
  deleteFeature?: Maybe<Feature>;
  deleteFeatures?: Maybe<Array<Maybe<Feature>>>;
  deleteFooter?: Maybe<Footer>;
  deleteFooterSection?: Maybe<FooterSection>;
  deleteFooterSections?: Maybe<Array<Maybe<FooterSection>>>;
  deleteFooters?: Maybe<Array<Maybe<Footer>>>;
  deleteHero?: Maybe<Hero>;
  deleteHeroBanner?: Maybe<HeroBanner>;
  deleteHeroBannerAdditional?: Maybe<HeroBannerAdditional>;
  deleteHeroBannerAdditionals?: Maybe<Array<Maybe<HeroBannerAdditional>>>;
  deleteHeroBanners?: Maybe<Array<Maybe<HeroBanner>>>;
  deleteHeroes?: Maybe<Array<Maybe<Hero>>>;
  deleteImage?: Maybe<Image>;
  deleteImages?: Maybe<Array<Maybe<Image>>>;
  deleteLanguage?: Maybe<Language>;
  deleteLanguages?: Maybe<Array<Maybe<Language>>>;
  deleteMap?: Maybe<Map>;
  deleteMaps?: Maybe<Array<Maybe<Map>>>;
  deleteNavigation?: Maybe<Navigation>;
  deleteNavigationLink?: Maybe<NavigationLink>;
  deleteNavigationLinks?: Maybe<Array<Maybe<NavigationLink>>>;
  deleteNavigations?: Maybe<Array<Maybe<Navigation>>>;
  deletePageContent?: Maybe<PageContent>;
  deletePageContents?: Maybe<Array<Maybe<PageContent>>>;
  deleteSection?: Maybe<Section>;
  deleteSections?: Maybe<Array<Maybe<Section>>>;
  deleteTestimonialBadge?: Maybe<TestimonialBadge>;
  deleteTestimonialBadges?: Maybe<Array<Maybe<TestimonialBadge>>>;
  deleteTestimonialItem?: Maybe<TestimonialItem>;
  deleteTestimonialItems?: Maybe<Array<Maybe<TestimonialItem>>>;
  deleteTestimonialSection?: Maybe<TestimonialSection>;
  deleteTestimonialSections?: Maybe<Array<Maybe<TestimonialSection>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  deleteValue?: Maybe<Value>;
  deleteValues?: Maybe<Array<Maybe<Value>>>;
  endSession: Scalars['Boolean']['output'];
  updateAbout?: Maybe<About>;
  updateAbouts?: Maybe<Array<Maybe<About>>>;
  updateAnalytic?: Maybe<Analytic>;
  updateAnalytics?: Maybe<Array<Maybe<Analytic>>>;
  updateAnalyticsStat?: Maybe<AnalyticsStat>;
  updateAnalyticsStats?: Maybe<Array<Maybe<AnalyticsStat>>>;
  updateAnalyticsSummaryItem?: Maybe<AnalyticsSummaryItem>;
  updateAnalyticsSummaryItems?: Maybe<Array<Maybe<AnalyticsSummaryItem>>>;
  updateApproach?: Maybe<Approach>;
  updateApproachStep?: Maybe<ApproachStep>;
  updateApproachSteps?: Maybe<Array<Maybe<ApproachStep>>>;
  updateApproaches?: Maybe<Array<Maybe<Approach>>>;
  updateBackground?: Maybe<Background>;
  updateBackgrounds?: Maybe<Array<Maybe<Background>>>;
  updateBenefit?: Maybe<Benefit>;
  updateBenefitSection?: Maybe<BenefitSection>;
  updateBenefitSections?: Maybe<Array<Maybe<BenefitSection>>>;
  updateBenefits?: Maybe<Array<Maybe<Benefit>>>;
  updateCertification?: Maybe<Certification>;
  updateCertificationSection?: Maybe<CertificationSection>;
  updateCertificationSections?: Maybe<Array<Maybe<CertificationSection>>>;
  updateCertifications?: Maybe<Array<Maybe<Certification>>>;
  updateCta?: Maybe<Cta>;
  updateCtaSection?: Maybe<CtaSection>;
  updateCtaSections?: Maybe<Array<Maybe<CtaSection>>>;
  updateCtas?: Maybe<Array<Maybe<Cta>>>;
  updateFaq?: Maybe<Faq>;
  updateFaqs?: Maybe<Array<Maybe<Faq>>>;
  updateFeature?: Maybe<Feature>;
  updateFeatures?: Maybe<Array<Maybe<Feature>>>;
  updateFooter?: Maybe<Footer>;
  updateFooterSection?: Maybe<FooterSection>;
  updateFooterSections?: Maybe<Array<Maybe<FooterSection>>>;
  updateFooters?: Maybe<Array<Maybe<Footer>>>;
  updateHero?: Maybe<Hero>;
  updateHeroBanner?: Maybe<HeroBanner>;
  updateHeroBannerAdditional?: Maybe<HeroBannerAdditional>;
  updateHeroBannerAdditionals?: Maybe<Array<Maybe<HeroBannerAdditional>>>;
  updateHeroBanners?: Maybe<Array<Maybe<HeroBanner>>>;
  updateHeroes?: Maybe<Array<Maybe<Hero>>>;
  updateImage?: Maybe<Image>;
  updateImages?: Maybe<Array<Maybe<Image>>>;
  updateLanguage?: Maybe<Language>;
  updateLanguages?: Maybe<Array<Maybe<Language>>>;
  updateMap?: Maybe<Map>;
  updateMaps?: Maybe<Array<Maybe<Map>>>;
  updateNavigation?: Maybe<Navigation>;
  updateNavigationLink?: Maybe<NavigationLink>;
  updateNavigationLinks?: Maybe<Array<Maybe<NavigationLink>>>;
  updateNavigations?: Maybe<Array<Maybe<Navigation>>>;
  updatePageContent?: Maybe<PageContent>;
  updatePageContents?: Maybe<Array<Maybe<PageContent>>>;
  updateSection?: Maybe<Section>;
  updateSections?: Maybe<Array<Maybe<Section>>>;
  updateTestimonialBadge?: Maybe<TestimonialBadge>;
  updateTestimonialBadges?: Maybe<Array<Maybe<TestimonialBadge>>>;
  updateTestimonialItem?: Maybe<TestimonialItem>;
  updateTestimonialItems?: Maybe<Array<Maybe<TestimonialItem>>>;
  updateTestimonialSection?: Maybe<TestimonialSection>;
  updateTestimonialSections?: Maybe<Array<Maybe<TestimonialSection>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  updateValue?: Maybe<Value>;
  updateValues?: Maybe<Array<Maybe<Value>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateAboutArgs = {
  data: AboutCreateInput;
};


export type MutationCreateAboutsArgs = {
  data: Array<AboutCreateInput>;
};


export type MutationCreateAnalyticArgs = {
  data: AnalyticCreateInput;
};


export type MutationCreateAnalyticsArgs = {
  data: Array<AnalyticCreateInput>;
};


export type MutationCreateAnalyticsStatArgs = {
  data: AnalyticsStatCreateInput;
};


export type MutationCreateAnalyticsStatsArgs = {
  data: Array<AnalyticsStatCreateInput>;
};


export type MutationCreateAnalyticsSummaryItemArgs = {
  data: AnalyticsSummaryItemCreateInput;
};


export type MutationCreateAnalyticsSummaryItemsArgs = {
  data: Array<AnalyticsSummaryItemCreateInput>;
};


export type MutationCreateApproachArgs = {
  data: ApproachCreateInput;
};


export type MutationCreateApproachStepArgs = {
  data: ApproachStepCreateInput;
};


export type MutationCreateApproachStepsArgs = {
  data: Array<ApproachStepCreateInput>;
};


export type MutationCreateApproachesArgs = {
  data: Array<ApproachCreateInput>;
};


export type MutationCreateBackgroundArgs = {
  data: BackgroundCreateInput;
};


export type MutationCreateBackgroundsArgs = {
  data: Array<BackgroundCreateInput>;
};


export type MutationCreateBenefitArgs = {
  data: BenefitCreateInput;
};


export type MutationCreateBenefitSectionArgs = {
  data: BenefitSectionCreateInput;
};


export type MutationCreateBenefitSectionsArgs = {
  data: Array<BenefitSectionCreateInput>;
};


export type MutationCreateBenefitsArgs = {
  data: Array<BenefitCreateInput>;
};


export type MutationCreateCertificationArgs = {
  data: CertificationCreateInput;
};


export type MutationCreateCertificationSectionArgs = {
  data: CertificationSectionCreateInput;
};


export type MutationCreateCertificationSectionsArgs = {
  data: Array<CertificationSectionCreateInput>;
};


export type MutationCreateCertificationsArgs = {
  data: Array<CertificationCreateInput>;
};


export type MutationCreateCtaArgs = {
  data: CtaCreateInput;
};


export type MutationCreateCtaSectionArgs = {
  data: CtaSectionCreateInput;
};


export type MutationCreateCtaSectionsArgs = {
  data: Array<CtaSectionCreateInput>;
};


export type MutationCreateCtasArgs = {
  data: Array<CtaCreateInput>;
};


export type MutationCreateFaqArgs = {
  data: FaqCreateInput;
};


export type MutationCreateFaqsArgs = {
  data: Array<FaqCreateInput>;
};


export type MutationCreateFeatureArgs = {
  data: FeatureCreateInput;
};


export type MutationCreateFeaturesArgs = {
  data: Array<FeatureCreateInput>;
};


export type MutationCreateFooterArgs = {
  data: FooterCreateInput;
};


export type MutationCreateFooterSectionArgs = {
  data: FooterSectionCreateInput;
};


export type MutationCreateFooterSectionsArgs = {
  data: Array<FooterSectionCreateInput>;
};


export type MutationCreateFootersArgs = {
  data: Array<FooterCreateInput>;
};


export type MutationCreateHeroArgs = {
  data: HeroCreateInput;
};


export type MutationCreateHeroBannerArgs = {
  data: HeroBannerCreateInput;
};


export type MutationCreateHeroBannerAdditionalArgs = {
  data: HeroBannerAdditionalCreateInput;
};


export type MutationCreateHeroBannerAdditionalsArgs = {
  data: Array<HeroBannerAdditionalCreateInput>;
};


export type MutationCreateHeroBannersArgs = {
  data: Array<HeroBannerCreateInput>;
};


export type MutationCreateHeroesArgs = {
  data: Array<HeroCreateInput>;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateImagesArgs = {
  data: Array<ImageCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateLanguageArgs = {
  data: LanguageCreateInput;
};


export type MutationCreateLanguagesArgs = {
  data: Array<LanguageCreateInput>;
};


export type MutationCreateMapArgs = {
  data: MapCreateInput;
};


export type MutationCreateMapsArgs = {
  data: Array<MapCreateInput>;
};


export type MutationCreateNavigationArgs = {
  data: NavigationCreateInput;
};


export type MutationCreateNavigationLinkArgs = {
  data: NavigationLinkCreateInput;
};


export type MutationCreateNavigationLinksArgs = {
  data: Array<NavigationLinkCreateInput>;
};


export type MutationCreateNavigationsArgs = {
  data: Array<NavigationCreateInput>;
};


export type MutationCreatePageContentArgs = {
  data: PageContentCreateInput;
};


export type MutationCreatePageContentsArgs = {
  data: Array<PageContentCreateInput>;
};


export type MutationCreateSectionArgs = {
  data: SectionCreateInput;
};


export type MutationCreateSectionsArgs = {
  data: Array<SectionCreateInput>;
};


export type MutationCreateTestimonialBadgeArgs = {
  data: TestimonialBadgeCreateInput;
};


export type MutationCreateTestimonialBadgesArgs = {
  data: Array<TestimonialBadgeCreateInput>;
};


export type MutationCreateTestimonialItemArgs = {
  data: TestimonialItemCreateInput;
};


export type MutationCreateTestimonialItemsArgs = {
  data: Array<TestimonialItemCreateInput>;
};


export type MutationCreateTestimonialSectionArgs = {
  data: TestimonialSectionCreateInput;
};


export type MutationCreateTestimonialSectionsArgs = {
  data: Array<TestimonialSectionCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationCreateValueArgs = {
  data: ValueCreateInput;
};


export type MutationCreateValuesArgs = {
  data: Array<ValueCreateInput>;
};


export type MutationDeleteAboutArgs = {
  where: AboutWhereUniqueInput;
};


export type MutationDeleteAboutsArgs = {
  where: Array<AboutWhereUniqueInput>;
};


export type MutationDeleteAnalyticArgs = {
  where: AnalyticWhereUniqueInput;
};


export type MutationDeleteAnalyticsArgs = {
  where: Array<AnalyticWhereUniqueInput>;
};


export type MutationDeleteAnalyticsStatArgs = {
  where: AnalyticsStatWhereUniqueInput;
};


export type MutationDeleteAnalyticsStatsArgs = {
  where: Array<AnalyticsStatWhereUniqueInput>;
};


export type MutationDeleteAnalyticsSummaryItemArgs = {
  where: AnalyticsSummaryItemWhereUniqueInput;
};


export type MutationDeleteAnalyticsSummaryItemsArgs = {
  where: Array<AnalyticsSummaryItemWhereUniqueInput>;
};


export type MutationDeleteApproachArgs = {
  where: ApproachWhereUniqueInput;
};


export type MutationDeleteApproachStepArgs = {
  where: ApproachStepWhereUniqueInput;
};


export type MutationDeleteApproachStepsArgs = {
  where: Array<ApproachStepWhereUniqueInput>;
};


export type MutationDeleteApproachesArgs = {
  where: Array<ApproachWhereUniqueInput>;
};


export type MutationDeleteBackgroundArgs = {
  where: BackgroundWhereUniqueInput;
};


export type MutationDeleteBackgroundsArgs = {
  where: Array<BackgroundWhereUniqueInput>;
};


export type MutationDeleteBenefitArgs = {
  where: BenefitWhereUniqueInput;
};


export type MutationDeleteBenefitSectionArgs = {
  where: BenefitSectionWhereUniqueInput;
};


export type MutationDeleteBenefitSectionsArgs = {
  where: Array<BenefitSectionWhereUniqueInput>;
};


export type MutationDeleteBenefitsArgs = {
  where: Array<BenefitWhereUniqueInput>;
};


export type MutationDeleteCertificationArgs = {
  where: CertificationWhereUniqueInput;
};


export type MutationDeleteCertificationSectionArgs = {
  where: CertificationSectionWhereUniqueInput;
};


export type MutationDeleteCertificationSectionsArgs = {
  where: Array<CertificationSectionWhereUniqueInput>;
};


export type MutationDeleteCertificationsArgs = {
  where: Array<CertificationWhereUniqueInput>;
};


export type MutationDeleteCtaArgs = {
  where: CtaWhereUniqueInput;
};


export type MutationDeleteCtaSectionArgs = {
  where: CtaSectionWhereUniqueInput;
};


export type MutationDeleteCtaSectionsArgs = {
  where: Array<CtaSectionWhereUniqueInput>;
};


export type MutationDeleteCtasArgs = {
  where: Array<CtaWhereUniqueInput>;
};


export type MutationDeleteFaqArgs = {
  where: FaqWhereUniqueInput;
};


export type MutationDeleteFaqsArgs = {
  where: Array<FaqWhereUniqueInput>;
};


export type MutationDeleteFeatureArgs = {
  where: FeatureWhereUniqueInput;
};


export type MutationDeleteFeaturesArgs = {
  where: Array<FeatureWhereUniqueInput>;
};


export type MutationDeleteFooterArgs = {
  where: FooterWhereUniqueInput;
};


export type MutationDeleteFooterSectionArgs = {
  where: FooterSectionWhereUniqueInput;
};


export type MutationDeleteFooterSectionsArgs = {
  where: Array<FooterSectionWhereUniqueInput>;
};


export type MutationDeleteFootersArgs = {
  where: Array<FooterWhereUniqueInput>;
};


export type MutationDeleteHeroArgs = {
  where: HeroWhereUniqueInput;
};


export type MutationDeleteHeroBannerArgs = {
  where: HeroBannerWhereUniqueInput;
};


export type MutationDeleteHeroBannerAdditionalArgs = {
  where: HeroBannerAdditionalWhereUniqueInput;
};


export type MutationDeleteHeroBannerAdditionalsArgs = {
  where: Array<HeroBannerAdditionalWhereUniqueInput>;
};


export type MutationDeleteHeroBannersArgs = {
  where: Array<HeroBannerWhereUniqueInput>;
};


export type MutationDeleteHeroesArgs = {
  where: Array<HeroWhereUniqueInput>;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteImagesArgs = {
  where: Array<ImageWhereUniqueInput>;
};


export type MutationDeleteLanguageArgs = {
  where: LanguageWhereUniqueInput;
};


export type MutationDeleteLanguagesArgs = {
  where: Array<LanguageWhereUniqueInput>;
};


export type MutationDeleteMapArgs = {
  where: MapWhereUniqueInput;
};


export type MutationDeleteMapsArgs = {
  where: Array<MapWhereUniqueInput>;
};


export type MutationDeleteNavigationArgs = {
  where: NavigationWhereUniqueInput;
};


export type MutationDeleteNavigationLinkArgs = {
  where: NavigationLinkWhereUniqueInput;
};


export type MutationDeleteNavigationLinksArgs = {
  where: Array<NavigationLinkWhereUniqueInput>;
};


export type MutationDeleteNavigationsArgs = {
  where: Array<NavigationWhereUniqueInput>;
};


export type MutationDeletePageContentArgs = {
  where: PageContentWhereUniqueInput;
};


export type MutationDeletePageContentsArgs = {
  where: Array<PageContentWhereUniqueInput>;
};


export type MutationDeleteSectionArgs = {
  where: SectionWhereUniqueInput;
};


export type MutationDeleteSectionsArgs = {
  where: Array<SectionWhereUniqueInput>;
};


export type MutationDeleteTestimonialBadgeArgs = {
  where: TestimonialBadgeWhereUniqueInput;
};


export type MutationDeleteTestimonialBadgesArgs = {
  where: Array<TestimonialBadgeWhereUniqueInput>;
};


export type MutationDeleteTestimonialItemArgs = {
  where: TestimonialItemWhereUniqueInput;
};


export type MutationDeleteTestimonialItemsArgs = {
  where: Array<TestimonialItemWhereUniqueInput>;
};


export type MutationDeleteTestimonialSectionArgs = {
  where: TestimonialSectionWhereUniqueInput;
};


export type MutationDeleteTestimonialSectionsArgs = {
  where: Array<TestimonialSectionWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationDeleteValueArgs = {
  where: ValueWhereUniqueInput;
};


export type MutationDeleteValuesArgs = {
  where: Array<ValueWhereUniqueInput>;
};


export type MutationUpdateAboutArgs = {
  data: AboutUpdateInput;
  where: AboutWhereUniqueInput;
};


export type MutationUpdateAboutsArgs = {
  data: Array<AboutUpdateArgs>;
};


export type MutationUpdateAnalyticArgs = {
  data: AnalyticUpdateInput;
  where: AnalyticWhereUniqueInput;
};


export type MutationUpdateAnalyticsArgs = {
  data: Array<AnalyticUpdateArgs>;
};


export type MutationUpdateAnalyticsStatArgs = {
  data: AnalyticsStatUpdateInput;
  where: AnalyticsStatWhereUniqueInput;
};


export type MutationUpdateAnalyticsStatsArgs = {
  data: Array<AnalyticsStatUpdateArgs>;
};


export type MutationUpdateAnalyticsSummaryItemArgs = {
  data: AnalyticsSummaryItemUpdateInput;
  where: AnalyticsSummaryItemWhereUniqueInput;
};


export type MutationUpdateAnalyticsSummaryItemsArgs = {
  data: Array<AnalyticsSummaryItemUpdateArgs>;
};


export type MutationUpdateApproachArgs = {
  data: ApproachUpdateInput;
  where: ApproachWhereUniqueInput;
};


export type MutationUpdateApproachStepArgs = {
  data: ApproachStepUpdateInput;
  where: ApproachStepWhereUniqueInput;
};


export type MutationUpdateApproachStepsArgs = {
  data: Array<ApproachStepUpdateArgs>;
};


export type MutationUpdateApproachesArgs = {
  data: Array<ApproachUpdateArgs>;
};


export type MutationUpdateBackgroundArgs = {
  data: BackgroundUpdateInput;
  where: BackgroundWhereUniqueInput;
};


export type MutationUpdateBackgroundsArgs = {
  data: Array<BackgroundUpdateArgs>;
};


export type MutationUpdateBenefitArgs = {
  data: BenefitUpdateInput;
  where: BenefitWhereUniqueInput;
};


export type MutationUpdateBenefitSectionArgs = {
  data: BenefitSectionUpdateInput;
  where: BenefitSectionWhereUniqueInput;
};


export type MutationUpdateBenefitSectionsArgs = {
  data: Array<BenefitSectionUpdateArgs>;
};


export type MutationUpdateBenefitsArgs = {
  data: Array<BenefitUpdateArgs>;
};


export type MutationUpdateCertificationArgs = {
  data: CertificationUpdateInput;
  where: CertificationWhereUniqueInput;
};


export type MutationUpdateCertificationSectionArgs = {
  data: CertificationSectionUpdateInput;
  where: CertificationSectionWhereUniqueInput;
};


export type MutationUpdateCertificationSectionsArgs = {
  data: Array<CertificationSectionUpdateArgs>;
};


export type MutationUpdateCertificationsArgs = {
  data: Array<CertificationUpdateArgs>;
};


export type MutationUpdateCtaArgs = {
  data: CtaUpdateInput;
  where: CtaWhereUniqueInput;
};


export type MutationUpdateCtaSectionArgs = {
  data: CtaSectionUpdateInput;
  where: CtaSectionWhereUniqueInput;
};


export type MutationUpdateCtaSectionsArgs = {
  data: Array<CtaSectionUpdateArgs>;
};


export type MutationUpdateCtasArgs = {
  data: Array<CtaUpdateArgs>;
};


export type MutationUpdateFaqArgs = {
  data: FaqUpdateInput;
  where: FaqWhereUniqueInput;
};


export type MutationUpdateFaqsArgs = {
  data: Array<FaqUpdateArgs>;
};


export type MutationUpdateFeatureArgs = {
  data: FeatureUpdateInput;
  where: FeatureWhereUniqueInput;
};


export type MutationUpdateFeaturesArgs = {
  data: Array<FeatureUpdateArgs>;
};


export type MutationUpdateFooterArgs = {
  data: FooterUpdateInput;
  where: FooterWhereUniqueInput;
};


export type MutationUpdateFooterSectionArgs = {
  data: FooterSectionUpdateInput;
  where: FooterSectionWhereUniqueInput;
};


export type MutationUpdateFooterSectionsArgs = {
  data: Array<FooterSectionUpdateArgs>;
};


export type MutationUpdateFootersArgs = {
  data: Array<FooterUpdateArgs>;
};


export type MutationUpdateHeroArgs = {
  data: HeroUpdateInput;
  where: HeroWhereUniqueInput;
};


export type MutationUpdateHeroBannerArgs = {
  data: HeroBannerUpdateInput;
  where: HeroBannerWhereUniqueInput;
};


export type MutationUpdateHeroBannerAdditionalArgs = {
  data: HeroBannerAdditionalUpdateInput;
  where: HeroBannerAdditionalWhereUniqueInput;
};


export type MutationUpdateHeroBannerAdditionalsArgs = {
  data: Array<HeroBannerAdditionalUpdateArgs>;
};


export type MutationUpdateHeroBannersArgs = {
  data: Array<HeroBannerUpdateArgs>;
};


export type MutationUpdateHeroesArgs = {
  data: Array<HeroUpdateArgs>;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateImagesArgs = {
  data: Array<ImageUpdateArgs>;
};


export type MutationUpdateLanguageArgs = {
  data: LanguageUpdateInput;
  where: LanguageWhereUniqueInput;
};


export type MutationUpdateLanguagesArgs = {
  data: Array<LanguageUpdateArgs>;
};


export type MutationUpdateMapArgs = {
  data: MapUpdateInput;
  where: MapWhereUniqueInput;
};


export type MutationUpdateMapsArgs = {
  data: Array<MapUpdateArgs>;
};


export type MutationUpdateNavigationArgs = {
  data: NavigationUpdateInput;
  where: NavigationWhereUniqueInput;
};


export type MutationUpdateNavigationLinkArgs = {
  data: NavigationLinkUpdateInput;
  where: NavigationLinkWhereUniqueInput;
};


export type MutationUpdateNavigationLinksArgs = {
  data: Array<NavigationLinkUpdateArgs>;
};


export type MutationUpdateNavigationsArgs = {
  data: Array<NavigationUpdateArgs>;
};


export type MutationUpdatePageContentArgs = {
  data: PageContentUpdateInput;
  where: PageContentWhereUniqueInput;
};


export type MutationUpdatePageContentsArgs = {
  data: Array<PageContentUpdateArgs>;
};


export type MutationUpdateSectionArgs = {
  data: SectionUpdateInput;
  where: SectionWhereUniqueInput;
};


export type MutationUpdateSectionsArgs = {
  data: Array<SectionUpdateArgs>;
};


export type MutationUpdateTestimonialBadgeArgs = {
  data: TestimonialBadgeUpdateInput;
  where: TestimonialBadgeWhereUniqueInput;
};


export type MutationUpdateTestimonialBadgesArgs = {
  data: Array<TestimonialBadgeUpdateArgs>;
};


export type MutationUpdateTestimonialItemArgs = {
  data: TestimonialItemUpdateInput;
  where: TestimonialItemWhereUniqueInput;
};


export type MutationUpdateTestimonialItemsArgs = {
  data: Array<TestimonialItemUpdateArgs>;
};


export type MutationUpdateTestimonialSectionArgs = {
  data: TestimonialSectionUpdateInput;
  where: TestimonialSectionWhereUniqueInput;
};


export type MutationUpdateTestimonialSectionsArgs = {
  data: Array<TestimonialSectionUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationUpdateValueArgs = {
  data: ValueUpdateInput;
  where: ValueWhereUniqueInput;
};


export type MutationUpdateValuesArgs = {
  data: Array<ValueUpdateArgs>;
};

export type Navigation = {
  __typename?: 'Navigation';
  cta?: Maybe<Cta>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  items?: Maybe<Array<NavigationLink>>;
  itemsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type NavigationItemsArgs = {
  cursor?: InputMaybe<NavigationLinkWhereUniqueInput>;
  orderBy?: Array<NavigationLinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NavigationLinkWhereInput;
};


export type NavigationItemsCountArgs = {
  where?: NavigationLinkWhereInput;
};

export type NavigationCreateInput = {
  cta?: InputMaybe<CtaRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForCreateInput>;
  items?: InputMaybe<NavigationLinkRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationLink = {
  __typename?: 'NavigationLink';
  external?: Maybe<Scalars['Boolean']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type NavigationLinkCreateInput = {
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationLinkManyRelationFilter = {
  every?: InputMaybe<NavigationLinkWhereInput>;
  none?: InputMaybe<NavigationLinkWhereInput>;
  some?: InputMaybe<NavigationLinkWhereInput>;
};

export type NavigationLinkOrderByInput = {
  external?: InputMaybe<OrderDirection>;
  href?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type NavigationLinkRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<NavigationLinkWhereUniqueInput>>;
  create?: InputMaybe<Array<NavigationLinkCreateInput>>;
};

export type NavigationLinkRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<NavigationLinkWhereUniqueInput>>;
  create?: InputMaybe<Array<NavigationLinkCreateInput>>;
  disconnect?: InputMaybe<Array<NavigationLinkWhereUniqueInput>>;
  set?: InputMaybe<Array<NavigationLinkWhereUniqueInput>>;
};

export type NavigationLinkUpdateArgs = {
  data: NavigationLinkUpdateInput;
  where: NavigationLinkWhereUniqueInput;
};

export type NavigationLinkUpdateInput = {
  external?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationLinkWhereInput = {
  AND?: InputMaybe<Array<NavigationLinkWhereInput>>;
  NOT?: InputMaybe<Array<NavigationLinkWhereInput>>;
  OR?: InputMaybe<Array<NavigationLinkWhereInput>>;
  external?: InputMaybe<BooleanFilter>;
  href?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
};

export type NavigationLinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type NavigationOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type NavigationRelateToOneForCreateInput = {
  connect?: InputMaybe<NavigationWhereUniqueInput>;
  create?: InputMaybe<NavigationCreateInput>;
};

export type NavigationRelateToOneForUpdateInput = {
  connect?: InputMaybe<NavigationWhereUniqueInput>;
  create?: InputMaybe<NavigationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NavigationUpdateArgs = {
  data: NavigationUpdateInput;
  where: NavigationWhereUniqueInput;
};

export type NavigationUpdateInput = {
  cta?: InputMaybe<CtaRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForUpdateInput>;
  items?: InputMaybe<NavigationLinkRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationWhereInput = {
  AND?: InputMaybe<Array<NavigationWhereInput>>;
  NOT?: InputMaybe<Array<NavigationWhereInput>>;
  OR?: InputMaybe<Array<NavigationWhereInput>>;
  cta?: InputMaybe<CtaWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageWhereInput>;
  items?: InputMaybe<NavigationLinkManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type NavigationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageContent = {
  __typename?: 'PageContent';
  cta?: Maybe<Cta>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  sections?: Maybe<Array<Section>>;
  sectionsCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PageContentSectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>;
  orderBy?: Array<SectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SectionWhereInput;
};


export type PageContentSectionsCountArgs = {
  where?: SectionWhereInput;
};

export type PageContentCreateInput = {
  cta?: InputMaybe<CtaRelateToOneForCreateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForCreateInput>;
  sections?: InputMaybe<SectionRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageContentOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PageContentUpdateArgs = {
  data: PageContentUpdateInput;
  where: PageContentWhereUniqueInput;
};

export type PageContentUpdateInput = {
  cta?: InputMaybe<CtaRelateToOneForUpdateInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForUpdateInput>;
  sections?: InputMaybe<SectionRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageContentWhereInput = {
  AND?: InputMaybe<Array<PageContentWhereInput>>;
  NOT?: InputMaybe<Array<PageContentWhereInput>>;
  OR?: InputMaybe<Array<PageContentWhereInput>>;
  cta?: InputMaybe<CtaWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageWhereInput>;
  sections?: InputMaybe<SectionManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageContentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  about?: Maybe<About>;
  abouts?: Maybe<Array<About>>;
  aboutsCount?: Maybe<Scalars['Int']['output']>;
  analytic?: Maybe<Analytic>;
  analytics?: Maybe<Array<Analytic>>;
  analyticsCount?: Maybe<Scalars['Int']['output']>;
  analyticsStat?: Maybe<AnalyticsStat>;
  analyticsStats?: Maybe<Array<AnalyticsStat>>;
  analyticsStatsCount?: Maybe<Scalars['Int']['output']>;
  analyticsSummaryItem?: Maybe<AnalyticsSummaryItem>;
  analyticsSummaryItems?: Maybe<Array<AnalyticsSummaryItem>>;
  analyticsSummaryItemsCount?: Maybe<Scalars['Int']['output']>;
  approach?: Maybe<Approach>;
  approachStep?: Maybe<ApproachStep>;
  approachSteps?: Maybe<Array<ApproachStep>>;
  approachStepsCount?: Maybe<Scalars['Int']['output']>;
  approaches?: Maybe<Array<Approach>>;
  approachesCount?: Maybe<Scalars['Int']['output']>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  background?: Maybe<Background>;
  backgrounds?: Maybe<Array<Background>>;
  backgroundsCount?: Maybe<Scalars['Int']['output']>;
  benefit?: Maybe<Benefit>;
  benefitSection?: Maybe<BenefitSection>;
  benefitSections?: Maybe<Array<BenefitSection>>;
  benefitSectionsCount?: Maybe<Scalars['Int']['output']>;
  benefits?: Maybe<Array<Benefit>>;
  benefitsCount?: Maybe<Scalars['Int']['output']>;
  certification?: Maybe<Certification>;
  certificationSection?: Maybe<CertificationSection>;
  certificationSections?: Maybe<Array<CertificationSection>>;
  certificationSectionsCount?: Maybe<Scalars['Int']['output']>;
  certifications?: Maybe<Array<Certification>>;
  certificationsCount?: Maybe<Scalars['Int']['output']>;
  cta?: Maybe<Cta>;
  ctaSection?: Maybe<CtaSection>;
  ctaSections?: Maybe<Array<CtaSection>>;
  ctaSectionsCount?: Maybe<Scalars['Int']['output']>;
  ctas?: Maybe<Array<Cta>>;
  ctasCount?: Maybe<Scalars['Int']['output']>;
  faq?: Maybe<Faq>;
  faqs?: Maybe<Array<Faq>>;
  faqsCount?: Maybe<Scalars['Int']['output']>;
  feature?: Maybe<Feature>;
  features?: Maybe<Array<Feature>>;
  featuresCount?: Maybe<Scalars['Int']['output']>;
  footer?: Maybe<Footer>;
  footerSection?: Maybe<FooterSection>;
  footerSections?: Maybe<Array<FooterSection>>;
  footerSectionsCount?: Maybe<Scalars['Int']['output']>;
  footers?: Maybe<Array<Footer>>;
  footersCount?: Maybe<Scalars['Int']['output']>;
  hero?: Maybe<Hero>;
  heroBanner?: Maybe<HeroBanner>;
  heroBannerAdditional?: Maybe<HeroBannerAdditional>;
  heroBannerAdditionals?: Maybe<Array<HeroBannerAdditional>>;
  heroBannerAdditionalsCount?: Maybe<Scalars['Int']['output']>;
  heroBanners?: Maybe<Array<HeroBanner>>;
  heroBannersCount?: Maybe<Scalars['Int']['output']>;
  heroes?: Maybe<Array<Hero>>;
  heroesCount?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  imagesCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  language?: Maybe<Language>;
  languages?: Maybe<Array<Language>>;
  languagesCount?: Maybe<Scalars['Int']['output']>;
  map?: Maybe<Map>;
  maps?: Maybe<Array<Map>>;
  mapsCount?: Maybe<Scalars['Int']['output']>;
  navigation?: Maybe<Navigation>;
  navigationLink?: Maybe<NavigationLink>;
  navigationLinks?: Maybe<Array<NavigationLink>>;
  navigationLinksCount?: Maybe<Scalars['Int']['output']>;
  navigations?: Maybe<Array<Navigation>>;
  navigationsCount?: Maybe<Scalars['Int']['output']>;
  pageContent?: Maybe<PageContent>;
  pageContents?: Maybe<Array<PageContent>>;
  pageContentsCount?: Maybe<Scalars['Int']['output']>;
  section?: Maybe<Section>;
  sections?: Maybe<Array<Section>>;
  sectionsCount?: Maybe<Scalars['Int']['output']>;
  testimonialBadge?: Maybe<TestimonialBadge>;
  testimonialBadges?: Maybe<Array<TestimonialBadge>>;
  testimonialBadgesCount?: Maybe<Scalars['Int']['output']>;
  testimonialItem?: Maybe<TestimonialItem>;
  testimonialItems?: Maybe<Array<TestimonialItem>>;
  testimonialItemsCount?: Maybe<Scalars['Int']['output']>;
  testimonialSection?: Maybe<TestimonialSection>;
  testimonialSections?: Maybe<Array<TestimonialSection>>;
  testimonialSectionsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Value>;
  values?: Maybe<Array<Value>>;
  valuesCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryAboutArgs = {
  where: AboutWhereUniqueInput;
};


export type QueryAboutsArgs = {
  cursor?: InputMaybe<AboutWhereUniqueInput>;
  orderBy?: Array<AboutOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AboutWhereInput;
};


export type QueryAboutsCountArgs = {
  where?: AboutWhereInput;
};


export type QueryAnalyticArgs = {
  where: AnalyticWhereUniqueInput;
};


export type QueryAnalyticsArgs = {
  cursor?: InputMaybe<AnalyticWhereUniqueInput>;
  orderBy?: Array<AnalyticOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AnalyticWhereInput;
};


export type QueryAnalyticsCountArgs = {
  where?: AnalyticWhereInput;
};


export type QueryAnalyticsStatArgs = {
  where: AnalyticsStatWhereUniqueInput;
};


export type QueryAnalyticsStatsArgs = {
  cursor?: InputMaybe<AnalyticsStatWhereUniqueInput>;
  orderBy?: Array<AnalyticsStatOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AnalyticsStatWhereInput;
};


export type QueryAnalyticsStatsCountArgs = {
  where?: AnalyticsStatWhereInput;
};


export type QueryAnalyticsSummaryItemArgs = {
  where: AnalyticsSummaryItemWhereUniqueInput;
};


export type QueryAnalyticsSummaryItemsArgs = {
  cursor?: InputMaybe<AnalyticsSummaryItemWhereUniqueInput>;
  orderBy?: Array<AnalyticsSummaryItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AnalyticsSummaryItemWhereInput;
};


export type QueryAnalyticsSummaryItemsCountArgs = {
  where?: AnalyticsSummaryItemWhereInput;
};


export type QueryApproachArgs = {
  where: ApproachWhereUniqueInput;
};


export type QueryApproachStepArgs = {
  where: ApproachStepWhereUniqueInput;
};


export type QueryApproachStepsArgs = {
  cursor?: InputMaybe<ApproachStepWhereUniqueInput>;
  orderBy?: Array<ApproachStepOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ApproachStepWhereInput;
};


export type QueryApproachStepsCountArgs = {
  where?: ApproachStepWhereInput;
};


export type QueryApproachesArgs = {
  cursor?: InputMaybe<ApproachWhereUniqueInput>;
  orderBy?: Array<ApproachOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ApproachWhereInput;
};


export type QueryApproachesCountArgs = {
  where?: ApproachWhereInput;
};


export type QueryBackgroundArgs = {
  where: BackgroundWhereUniqueInput;
};


export type QueryBackgroundsArgs = {
  cursor?: InputMaybe<BackgroundWhereUniqueInput>;
  orderBy?: Array<BackgroundOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BackgroundWhereInput;
};


export type QueryBackgroundsCountArgs = {
  where?: BackgroundWhereInput;
};


export type QueryBenefitArgs = {
  where: BenefitWhereUniqueInput;
};


export type QueryBenefitSectionArgs = {
  where: BenefitSectionWhereUniqueInput;
};


export type QueryBenefitSectionsArgs = {
  cursor?: InputMaybe<BenefitSectionWhereUniqueInput>;
  orderBy?: Array<BenefitSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BenefitSectionWhereInput;
};


export type QueryBenefitSectionsCountArgs = {
  where?: BenefitSectionWhereInput;
};


export type QueryBenefitsArgs = {
  cursor?: InputMaybe<BenefitWhereUniqueInput>;
  orderBy?: Array<BenefitOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BenefitWhereInput;
};


export type QueryBenefitsCountArgs = {
  where?: BenefitWhereInput;
};


export type QueryCertificationArgs = {
  where: CertificationWhereUniqueInput;
};


export type QueryCertificationSectionArgs = {
  where: CertificationSectionWhereUniqueInput;
};


export type QueryCertificationSectionsArgs = {
  cursor?: InputMaybe<CertificationSectionWhereUniqueInput>;
  orderBy?: Array<CertificationSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CertificationSectionWhereInput;
};


export type QueryCertificationSectionsCountArgs = {
  where?: CertificationSectionWhereInput;
};


export type QueryCertificationsArgs = {
  cursor?: InputMaybe<CertificationWhereUniqueInput>;
  orderBy?: Array<CertificationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CertificationWhereInput;
};


export type QueryCertificationsCountArgs = {
  where?: CertificationWhereInput;
};


export type QueryCtaArgs = {
  where: CtaWhereUniqueInput;
};


export type QueryCtaSectionArgs = {
  where: CtaSectionWhereUniqueInput;
};


export type QueryCtaSectionsArgs = {
  cursor?: InputMaybe<CtaSectionWhereUniqueInput>;
  orderBy?: Array<CtaSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CtaSectionWhereInput;
};


export type QueryCtaSectionsCountArgs = {
  where?: CtaSectionWhereInput;
};


export type QueryCtasArgs = {
  cursor?: InputMaybe<CtaWhereUniqueInput>;
  orderBy?: Array<CtaOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CtaWhereInput;
};


export type QueryCtasCountArgs = {
  where?: CtaWhereInput;
};


export type QueryFaqArgs = {
  where: FaqWhereUniqueInput;
};


export type QueryFaqsArgs = {
  cursor?: InputMaybe<FaqWhereUniqueInput>;
  orderBy?: Array<FaqOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FaqWhereInput;
};


export type QueryFaqsCountArgs = {
  where?: FaqWhereInput;
};


export type QueryFeatureArgs = {
  where: FeatureWhereUniqueInput;
};


export type QueryFeaturesArgs = {
  cursor?: InputMaybe<FeatureWhereUniqueInput>;
  orderBy?: Array<FeatureOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FeatureWhereInput;
};


export type QueryFeaturesCountArgs = {
  where?: FeatureWhereInput;
};


export type QueryFooterArgs = {
  where: FooterWhereUniqueInput;
};


export type QueryFooterSectionArgs = {
  where: FooterSectionWhereUniqueInput;
};


export type QueryFooterSectionsArgs = {
  cursor?: InputMaybe<FooterSectionWhereUniqueInput>;
  orderBy?: Array<FooterSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FooterSectionWhereInput;
};


export type QueryFooterSectionsCountArgs = {
  where?: FooterSectionWhereInput;
};


export type QueryFootersArgs = {
  cursor?: InputMaybe<FooterWhereUniqueInput>;
  orderBy?: Array<FooterOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FooterWhereInput;
};


export type QueryFootersCountArgs = {
  where?: FooterWhereInput;
};


export type QueryHeroArgs = {
  where: HeroWhereUniqueInput;
};


export type QueryHeroBannerArgs = {
  where: HeroBannerWhereUniqueInput;
};


export type QueryHeroBannerAdditionalArgs = {
  where: HeroBannerAdditionalWhereUniqueInput;
};


export type QueryHeroBannerAdditionalsArgs = {
  cursor?: InputMaybe<HeroBannerAdditionalWhereUniqueInput>;
  orderBy?: Array<HeroBannerAdditionalOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HeroBannerAdditionalWhereInput;
};


export type QueryHeroBannerAdditionalsCountArgs = {
  where?: HeroBannerAdditionalWhereInput;
};


export type QueryHeroBannersArgs = {
  cursor?: InputMaybe<HeroBannerWhereUniqueInput>;
  orderBy?: Array<HeroBannerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HeroBannerWhereInput;
};


export type QueryHeroBannersCountArgs = {
  where?: HeroBannerWhereInput;
};


export type QueryHeroesArgs = {
  cursor?: InputMaybe<HeroWhereUniqueInput>;
  orderBy?: Array<HeroOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: HeroWhereInput;
};


export type QueryHeroesCountArgs = {
  where?: HeroWhereInput;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  orderBy?: Array<ImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageWhereInput;
};


export type QueryImagesCountArgs = {
  where?: ImageWhereInput;
};


export type QueryLanguageArgs = {
  where: LanguageWhereUniqueInput;
};


export type QueryLanguagesArgs = {
  cursor?: InputMaybe<LanguageWhereUniqueInput>;
  orderBy?: Array<LanguageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LanguageWhereInput;
};


export type QueryLanguagesCountArgs = {
  where?: LanguageWhereInput;
};


export type QueryMapArgs = {
  where: MapWhereUniqueInput;
};


export type QueryMapsArgs = {
  cursor?: InputMaybe<MapWhereUniqueInput>;
  orderBy?: Array<MapOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MapWhereInput;
};


export type QueryMapsCountArgs = {
  where?: MapWhereInput;
};


export type QueryNavigationArgs = {
  where: NavigationWhereUniqueInput;
};


export type QueryNavigationLinkArgs = {
  where: NavigationLinkWhereUniqueInput;
};


export type QueryNavigationLinksArgs = {
  cursor?: InputMaybe<NavigationLinkWhereUniqueInput>;
  orderBy?: Array<NavigationLinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NavigationLinkWhereInput;
};


export type QueryNavigationLinksCountArgs = {
  where?: NavigationLinkWhereInput;
};


export type QueryNavigationsArgs = {
  cursor?: InputMaybe<NavigationWhereUniqueInput>;
  orderBy?: Array<NavigationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NavigationWhereInput;
};


export type QueryNavigationsCountArgs = {
  where?: NavigationWhereInput;
};


export type QueryPageContentArgs = {
  where: PageContentWhereUniqueInput;
};


export type QueryPageContentsArgs = {
  cursor?: InputMaybe<PageContentWhereUniqueInput>;
  orderBy?: Array<PageContentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PageContentWhereInput;
};


export type QueryPageContentsCountArgs = {
  where?: PageContentWhereInput;
};


export type QuerySectionArgs = {
  where: SectionWhereUniqueInput;
};


export type QuerySectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>;
  orderBy?: Array<SectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: SectionWhereInput;
};


export type QuerySectionsCountArgs = {
  where?: SectionWhereInput;
};


export type QueryTestimonialBadgeArgs = {
  where: TestimonialBadgeWhereUniqueInput;
};


export type QueryTestimonialBadgesArgs = {
  cursor?: InputMaybe<TestimonialBadgeWhereUniqueInput>;
  orderBy?: Array<TestimonialBadgeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TestimonialBadgeWhereInput;
};


export type QueryTestimonialBadgesCountArgs = {
  where?: TestimonialBadgeWhereInput;
};


export type QueryTestimonialItemArgs = {
  where: TestimonialItemWhereUniqueInput;
};


export type QueryTestimonialItemsArgs = {
  cursor?: InputMaybe<TestimonialItemWhereUniqueInput>;
  orderBy?: Array<TestimonialItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TestimonialItemWhereInput;
};


export type QueryTestimonialItemsCountArgs = {
  where?: TestimonialItemWhereInput;
};


export type QueryTestimonialSectionArgs = {
  where: TestimonialSectionWhereUniqueInput;
};


export type QueryTestimonialSectionsArgs = {
  cursor?: InputMaybe<TestimonialSectionWhereUniqueInput>;
  orderBy?: Array<TestimonialSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TestimonialSectionWhereInput;
};


export type QueryTestimonialSectionsCountArgs = {
  where?: TestimonialSectionWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryValueArgs = {
  where: ValueWhereUniqueInput;
};


export type QueryValuesArgs = {
  cursor?: InputMaybe<ValueWhereUniqueInput>;
  orderBy?: Array<ValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ValueWhereInput;
};


export type QueryValuesCountArgs = {
  where?: ValueWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Section = {
  __typename?: 'Section';
  contentAbout?: Maybe<About>;
  contentAnalytics?: Maybe<Analytic>;
  contentApproach?: Maybe<Approach>;
  contentBenefits?: Maybe<BenefitSection>;
  contentCertifications?: Maybe<CertificationSection>;
  contentCta?: Maybe<CtaSection>;
  contentFaqs?: Maybe<Array<Faq>>;
  contentFaqsCount?: Maybe<Scalars['Int']['output']>;
  contentFeatures?: Maybe<Array<Feature>>;
  contentFeaturesCount?: Maybe<Scalars['Int']['output']>;
  contentFooter?: Maybe<Footer>;
  contentHero?: Maybe<Hero>;
  contentMap?: Maybe<Map>;
  contentNavigation?: Maybe<Navigation>;
  contentTestimonials?: Maybe<TestimonialSection>;
  id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
};


export type SectionContentFaqsArgs = {
  cursor?: InputMaybe<FaqWhereUniqueInput>;
  orderBy?: Array<FaqOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FaqWhereInput;
};


export type SectionContentFaqsCountArgs = {
  where?: FaqWhereInput;
};


export type SectionContentFeaturesArgs = {
  cursor?: InputMaybe<FeatureWhereUniqueInput>;
  orderBy?: Array<FeatureOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FeatureWhereInput;
};


export type SectionContentFeaturesCountArgs = {
  where?: FeatureWhereInput;
};

export type SectionCreateInput = {
  contentAbout?: InputMaybe<AboutRelateToOneForCreateInput>;
  contentAnalytics?: InputMaybe<AnalyticRelateToOneForCreateInput>;
  contentApproach?: InputMaybe<ApproachRelateToOneForCreateInput>;
  contentBenefits?: InputMaybe<BenefitSectionRelateToOneForCreateInput>;
  contentCertifications?: InputMaybe<CertificationSectionRelateToOneForCreateInput>;
  contentCta?: InputMaybe<CtaSectionRelateToOneForCreateInput>;
  contentFaqs?: InputMaybe<FaqRelateToManyForCreateInput>;
  contentFeatures?: InputMaybe<FeatureRelateToManyForCreateInput>;
  contentFooter?: InputMaybe<FooterRelateToOneForCreateInput>;
  contentHero?: InputMaybe<HeroRelateToOneForCreateInput>;
  contentMap?: InputMaybe<MapRelateToOneForCreateInput>;
  contentNavigation?: InputMaybe<NavigationRelateToOneForCreateInput>;
  contentTestimonials?: InputMaybe<TestimonialSectionRelateToOneForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SectionManyRelationFilter = {
  every?: InputMaybe<SectionWhereInput>;
  none?: InputMaybe<SectionWhereInput>;
  some?: InputMaybe<SectionWhereInput>;
};

export type SectionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type SectionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SectionWhereUniqueInput>>;
  create?: InputMaybe<Array<SectionCreateInput>>;
};

export type SectionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SectionWhereUniqueInput>>;
  create?: InputMaybe<Array<SectionCreateInput>>;
  disconnect?: InputMaybe<Array<SectionWhereUniqueInput>>;
  set?: InputMaybe<Array<SectionWhereUniqueInput>>;
};

export type SectionUpdateArgs = {
  data: SectionUpdateInput;
  where: SectionWhereUniqueInput;
};

export type SectionUpdateInput = {
  contentAbout?: InputMaybe<AboutRelateToOneForUpdateInput>;
  contentAnalytics?: InputMaybe<AnalyticRelateToOneForUpdateInput>;
  contentApproach?: InputMaybe<ApproachRelateToOneForUpdateInput>;
  contentBenefits?: InputMaybe<BenefitSectionRelateToOneForUpdateInput>;
  contentCertifications?: InputMaybe<CertificationSectionRelateToOneForUpdateInput>;
  contentCta?: InputMaybe<CtaSectionRelateToOneForUpdateInput>;
  contentFaqs?: InputMaybe<FaqRelateToManyForUpdateInput>;
  contentFeatures?: InputMaybe<FeatureRelateToManyForUpdateInput>;
  contentFooter?: InputMaybe<FooterRelateToOneForUpdateInput>;
  contentHero?: InputMaybe<HeroRelateToOneForUpdateInput>;
  contentMap?: InputMaybe<MapRelateToOneForUpdateInput>;
  contentNavigation?: InputMaybe<NavigationRelateToOneForUpdateInput>;
  contentTestimonials?: InputMaybe<TestimonialSectionRelateToOneForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SectionWhereInput = {
  AND?: InputMaybe<Array<SectionWhereInput>>;
  NOT?: InputMaybe<Array<SectionWhereInput>>;
  OR?: InputMaybe<Array<SectionWhereInput>>;
  contentAbout?: InputMaybe<AboutWhereInput>;
  contentAnalytics?: InputMaybe<AnalyticWhereInput>;
  contentApproach?: InputMaybe<ApproachWhereInput>;
  contentBenefits?: InputMaybe<BenefitSectionWhereInput>;
  contentCertifications?: InputMaybe<CertificationSectionWhereInput>;
  contentCta?: InputMaybe<CtaSectionWhereInput>;
  contentFaqs?: InputMaybe<FaqManyRelationFilter>;
  contentFeatures?: InputMaybe<FeatureManyRelationFilter>;
  contentFooter?: InputMaybe<FooterWhereInput>;
  contentHero?: InputMaybe<HeroWhereInput>;
  contentMap?: InputMaybe<MapWhereInput>;
  contentNavigation?: InputMaybe<NavigationWhereInput>;
  contentTestimonials?: InputMaybe<TestimonialSectionWhereInput>;
  id?: InputMaybe<IdFilter>;
  type?: InputMaybe<StringFilter>;
};

export type SectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialBadge = {
  __typename?: 'TestimonialBadge';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type TestimonialBadgeCreateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialBadgeOrderByInput = {
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type TestimonialBadgeRelateToOneForCreateInput = {
  connect?: InputMaybe<TestimonialBadgeWhereUniqueInput>;
  create?: InputMaybe<TestimonialBadgeCreateInput>;
};

export type TestimonialBadgeRelateToOneForUpdateInput = {
  connect?: InputMaybe<TestimonialBadgeWhereUniqueInput>;
  create?: InputMaybe<TestimonialBadgeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestimonialBadgeUpdateArgs = {
  data: TestimonialBadgeUpdateInput;
  where: TestimonialBadgeWhereUniqueInput;
};

export type TestimonialBadgeUpdateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialBadgeWhereInput = {
  AND?: InputMaybe<Array<TestimonialBadgeWhereInput>>;
  NOT?: InputMaybe<Array<TestimonialBadgeWhereInput>>;
  OR?: InputMaybe<Array<TestimonialBadgeWhereInput>>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
};

export type TestimonialBadgeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TestimonialItem = {
  __typename?: 'TestimonialItem';
  badge?: Maybe<TestimonialBadge>;
  company?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  name?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type TestimonialItemCreateInput = {
  badge?: InputMaybe<TestimonialBadgeRelateToOneForCreateInput>;
  company?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialItemManyRelationFilter = {
  every?: InputMaybe<TestimonialItemWhereInput>;
  none?: InputMaybe<TestimonialItemWhereInput>;
  some?: InputMaybe<TestimonialItemWhereInput>;
};

export type TestimonialItemOrderByInput = {
  company?: InputMaybe<OrderDirection>;
  content?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  rating?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type TestimonialItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TestimonialItemWhereUniqueInput>>;
  create?: InputMaybe<Array<TestimonialItemCreateInput>>;
};

export type TestimonialItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TestimonialItemWhereUniqueInput>>;
  create?: InputMaybe<Array<TestimonialItemCreateInput>>;
  disconnect?: InputMaybe<Array<TestimonialItemWhereUniqueInput>>;
  set?: InputMaybe<Array<TestimonialItemWhereUniqueInput>>;
};

export type TestimonialItemRelateToOneForCreateInput = {
  connect?: InputMaybe<TestimonialItemWhereUniqueInput>;
  create?: InputMaybe<TestimonialItemCreateInput>;
};

export type TestimonialItemRelateToOneForUpdateInput = {
  connect?: InputMaybe<TestimonialItemWhereUniqueInput>;
  create?: InputMaybe<TestimonialItemCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestimonialItemUpdateArgs = {
  data: TestimonialItemUpdateInput;
  where: TestimonialItemWhereUniqueInput;
};

export type TestimonialItemUpdateInput = {
  badge?: InputMaybe<TestimonialBadgeRelateToOneForUpdateInput>;
  company?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialItemWhereInput = {
  AND?: InputMaybe<Array<TestimonialItemWhereInput>>;
  NOT?: InputMaybe<Array<TestimonialItemWhereInput>>;
  OR?: InputMaybe<Array<TestimonialItemWhereInput>>;
  badge?: InputMaybe<TestimonialBadgeWhereInput>;
  company?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageWhereInput>;
  name?: InputMaybe<StringFilter>;
  rating?: InputMaybe<FloatNullableFilter>;
  role?: InputMaybe<StringFilter>;
};

export type TestimonialItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TestimonialSection = {
  __typename?: 'TestimonialSection';
  background?: Maybe<Array<Background>>;
  backgroundCount?: Maybe<Scalars['Int']['output']>;
  fallback?: Maybe<TestimonialItem>;
  id: Scalars['ID']['output'];
  testimonials?: Maybe<Array<TestimonialItem>>;
  testimonialsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type TestimonialSectionBackgroundArgs = {
  cursor?: InputMaybe<BackgroundWhereUniqueInput>;
  orderBy?: Array<BackgroundOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BackgroundWhereInput;
};


export type TestimonialSectionBackgroundCountArgs = {
  where?: BackgroundWhereInput;
};


export type TestimonialSectionTestimonialsArgs = {
  cursor?: InputMaybe<TestimonialItemWhereUniqueInput>;
  orderBy?: Array<TestimonialItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TestimonialItemWhereInput;
};


export type TestimonialSectionTestimonialsCountArgs = {
  where?: TestimonialItemWhereInput;
};

export type TestimonialSectionCreateInput = {
  background?: InputMaybe<BackgroundRelateToManyForCreateInput>;
  fallback?: InputMaybe<TestimonialItemRelateToOneForCreateInput>;
  testimonials?: InputMaybe<TestimonialItemRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialSectionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type TestimonialSectionRelateToOneForCreateInput = {
  connect?: InputMaybe<TestimonialSectionWhereUniqueInput>;
  create?: InputMaybe<TestimonialSectionCreateInput>;
};

export type TestimonialSectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<TestimonialSectionWhereUniqueInput>;
  create?: InputMaybe<TestimonialSectionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestimonialSectionUpdateArgs = {
  data: TestimonialSectionUpdateInput;
  where: TestimonialSectionWhereUniqueInput;
};

export type TestimonialSectionUpdateInput = {
  background?: InputMaybe<BackgroundRelateToManyForUpdateInput>;
  fallback?: InputMaybe<TestimonialItemRelateToOneForUpdateInput>;
  testimonials?: InputMaybe<TestimonialItemRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TestimonialSectionWhereInput = {
  AND?: InputMaybe<Array<TestimonialSectionWhereInput>>;
  NOT?: InputMaybe<Array<TestimonialSectionWhereInput>>;
  OR?: InputMaybe<Array<TestimonialSectionWhereInput>>;
  background?: InputMaybe<BackgroundManyRelationFilter>;
  fallback?: InputMaybe<TestimonialItemWhereInput>;
  id?: InputMaybe<IdFilter>;
  testimonials?: InputMaybe<TestimonialItemManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type TestimonialSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Value = {
  __typename?: 'Value';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type ValueCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ValueManyRelationFilter = {
  every?: InputMaybe<ValueWhereInput>;
  none?: InputMaybe<ValueWhereInput>;
  some?: InputMaybe<ValueWhereInput>;
};

export type ValueOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  icon?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type ValueRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ValueWhereUniqueInput>>;
  create?: InputMaybe<Array<ValueCreateInput>>;
};

export type ValueRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ValueWhereUniqueInput>>;
  create?: InputMaybe<Array<ValueCreateInput>>;
  disconnect?: InputMaybe<Array<ValueWhereUniqueInput>>;
  set?: InputMaybe<Array<ValueWhereUniqueInput>>;
};

export type ValueUpdateArgs = {
  data: ValueUpdateInput;
  where: ValueWhereUniqueInput;
};

export type ValueUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ValueWhereInput = {
  AND?: InputMaybe<Array<ValueWhereInput>>;
  NOT?: InputMaybe<Array<ValueWhereInput>>;
  OR?: InputMaybe<Array<ValueWhereInput>>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
};

export type ValueWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};
