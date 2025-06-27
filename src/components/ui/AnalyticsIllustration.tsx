import { analyticsData } from "@/app/data"
import { AnalyticsStats, AnalyticsSummaryItem } from "@/app/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"
import { LineChartIllustration } from "../../../public/images/LineChartIllustration"

type AnalyticsIllustrationProps = {
  summary?: AnalyticsSummaryItem[]
  totalDeployments?: string
  deploymentChange?: string
  deploymentChangePercent?: string
  changePeriod?: string
  heading?: string
  subheading?: string
  stats?: AnalyticsStats
  tableHeadings?: string[]
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function AnalyticsIllustration({
  summary = analyticsData.summary,
  totalDeployments = analyticsData.stats.totalDeployments,
  deploymentChange = analyticsData.stats.deploymentChange,
  deploymentChangePercent = analyticsData.stats.deploymentChangePercent,
  changePeriod = analyticsData.stats.changePeriod,
  heading = analyticsData.heading,
  tableHeadings = analyticsData.tableHeadings,
}: AnalyticsIllustrationProps) {
  return (
    <div className="h-150 shrink-0 overflow-hidden [mask-image:radial-gradient(white_30%,transparent_90%)] perspective-[4000px] perspective-origin-center">
      <div className="-translate-y-10 -translate-z-10 rotate-x-10 rotate-y-20 -rotate-z-10 transform-3d">
        <h3 className="text-sm text-gray-500">{heading}</h3>
        {totalDeployments && (
          <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {totalDeployments} Deployments
          </p>
        )}
        <p className="mt-1 text-sm font-medium">
          <span className="text-emerald-700">
            {deploymentChange} ({deploymentChangePercent}%)
          </span>{" "}
          <span className="font-normal text-gray-500">{changePeriod}</span>
        </p>
        <LineChartIllustration className="mt-8 w-full min-w-200 shrink-0" />

        <TableRoot className="mt-6 min-w-200">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Project</TableHeaderCell>
                {tableHeadings.map((heading, index) => (
                  <TableHeaderCell
                    key={index}
                    className="text-right font-medium text-gray-900"
                  >
                    {heading}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium text-gray-900">
                    <div className="flex space-x-3">
                      <span
                        className={item.bgColor + " w-1 shrink-0 rounded"}
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.deployments}
                  </TableCell>
                  <TableCell className="text-right">{item.uptime}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        item.changeType === "positive"
                          ? "text-emerald-700"
                          : "text-red-700"
                      }
                    >
                      {item.clientSatisfaction}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        item.changeType === "positive"
                          ? "text-emerald-700"
                          : "text-red-700"
                      }
                    >
                      {item.efficiency}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        item.changeType === "positive"
                          ? "text-emerald-700"
                          : "text-red-700"
                      }
                    >
                      {item.revenueGrowth}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </div>
    </div>
  )
}
