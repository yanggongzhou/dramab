import { getLogParams } from "@/utils/logParams";
import { useAppSelector } from "@/store";
import { netHiveLog } from "@/server/clientLog";
import ClientConfig from "@/client.config";
import { AnyObject, ELogParamsAction } from "@/typings/hive.interfaces";

interface IHiveLog {
  track: (event: string, data?: AnyObject) => void;
  trackDownload: (event: string, data?: AnyObject) => void;
  pageView: (event: string, data?: AnyObject) => void;
  appLaunch: (data?: AnyObject) => void;
}

const useHiveLog = (): IHiveLog => {
  const clipboard = useAppSelector(state => state.hive.clipboard)
  const language = useAppSelector(state => state.hive.language)

  const getLogData = (event: string, data: AnyObject) => {
    const logData = getLogParams({
      event,
      clipboard,
      language,
      data,
    });
    netHiveLog(logData);
  }

  const track = (event: string, data?: AnyObject) => {
    getLogData(event, { action: ELogParamsAction.other, ...data });
  }
  const trackDownload = (event: string, data?: AnyObject) => {
    getLogData(event, { action: ELogParamsAction.download, ...data });
  }
  const pageView = (event: string, data?: AnyObject) => {
    getLogData(event, { action: ELogParamsAction.pv, ...data });
  }

  const appLaunch = (data?: AnyObject) => {
    const anyPageView = sessionStorage.getItem('AnyPage_view')
    if (!anyPageView || anyPageView !== ClientConfig.name) {
      sessionStorage.setItem('AnyPage_view', ClientConfig.name)
      getLogData('AnyPage_view', { action: ELogParamsAction.pv, ...data });
    }
  }
  return {
    track,
    trackDownload,
    pageView,
    appLaunch
  }
};

export default useHiveLog;
