import { Chip } from "@mui/material";

const ContentPanel = (props) => {
  const { children, actions, statusDisplay } = props;

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 text-center">
          {(actions || statusDisplay?.show) && (
            <>
              <div className="-mt-4 mb-6 flex justify-between border-b border-slate-200 px-0 pb-2 dark:border-strokedark">
                {statusDisplay?.show && (
                  <div className="py-3">
                    {statusDisplay?.status}{" "}
                    <Chip
                      label={statusDisplay?.value}
                      variant="outlined"
                      color={statusDisplay?.status ? "success" : "error"}
                    />
                  </div>
                )}

                {actions && <div>{actions}</div>}
              </div>
            </>
          )}

          <div className="mt-0">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ContentPanel;
