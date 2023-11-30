import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAutomationById } from "../lib/client";
import { Table, Spinner } from "flowbite-react";

export default function ViewAutomationPage() {
  let { automationId } = useParams();
  const [automation, setAutomation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAutomationById(automationId).then((data) => {
      setAutomation(data);
      setIsLoading(false);
    });
  }, [automationId]);

  return (
    <>
      {/* <div>
        ViewAutomationPage {automationId} <p>{JSON.stringify(automation)}</p>
      </div> */}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner color="warning" aria-label="Warning spinner example" />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col gap-y-10">
            <div className="px-5 py-5">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-bold leading-7 text-gray-900 uppercase">
                  {automation && automation.label ? automation.label : "N/A"}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {/* Personal details and application. */}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Trigger
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-row">
                          <h1 className="font-semibold pr-2">Field:</h1>
                          <p>
                            {automation &&
                            automation.trigger &&
                            automation.trigger.field
                              ? automation.trigger.field
                              : "N/A"}
                          </p>
                        </div>

                        <div className="flex flex-row">
                          <h1 className="font-semibold pr-2">Type:</h1>
                          <p>
                            {automation &&
                            automation.trigger &&
                            automation.trigger.type
                              ? automation.trigger.type
                              : "N/A"}
                          </p>
                        </div>

                        <div className="flex flex-row">
                          <h1 className="font-semibold pr-2">Value:</h1>
                          <p>
                            {automation &&
                            automation.trigger &&
                            automation.trigger.value
                              ? automation.trigger.value
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Conditions
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {automation &&
                      automation.conditions &&
                      automation.conditions.length > 0
                        ? automation.conditions.map((condition, index) => (
                            <div className="flex flex-col gap-y-2" key={index}>
                              <div>
                                <h1 className="font-bold italic">
                                  Conditions {index + 1}
                                </h1>
                              </div>

                              <div className="grid grid-cols-2 gap-y-2">
                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">Field:</h1>
                                  <p>{condition.field}</p>
                                </div>

                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">Type:</h1>
                                  <p>{condition.type}</p>
                                </div>

                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">Value:</h1>
                                  <p>{condition.value}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        : "N/A"}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Actions
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {automation &&
                      automation.actions &&
                      automation.actions.length > 0
                        ? automation.actions.map((action, index) => (
                            <div className="flex flex-col gap-y-2" key={index}>
                              <div>
                                <h1 className="font-bold italic">
                                  Action {index + 1}
                                </h1>
                              </div>

                              <div className="flex flex-col gap-y-2">
                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">
                                    Account Type:
                                  </h1>
                                  <p>{action.destination.accountType}</p>
                                </div>

                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">
                                    Account Info:
                                  </h1>
                                  <p>{action.destination.accountInfo}</p>
                                </div>

                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">Type:</h1>
                                  <p>{action.type}</p>
                                </div>

                                <div className="flex flex-row">
                                  <h1 className="font-semibold pr-2">Value:</h1>
                                  <p>{action.value}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="">
              <h1 className="text-base font-bold leading-7 text-gray-900 uppercase">
                History
              </h1>

              <div className="overflow-x-auto py-3">
                <Table striped>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Start Time
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Finish Time
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Logs
                      </th>
                    </tr>
                  </thead>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{'Apple MacBook Pro 17"'}</Table.Cell>
                      <Table.Cell>Sliver</Table.Cell>
                      <Table.Cell>Laptop</Table.Cell>
                      <Table.Cell>$2999</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
