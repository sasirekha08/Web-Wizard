import React, { useEffect } from 'react'
import { useState } from 'react'
import { RiAddBoxFill } from 'react-icons/ri'
const EditorTabs = ({ component, children }) => {
    const [selectedTab, setSelectedTab] = useState(null)
    const [selectedTabId, setSelectedTabId] = useState(component?.children?.[0]?.compId)
    console.log('tabcomponent', component)
    useEffect(() => {
        if (selectedTabId) {
            const tabContent = component?.children?.filter((t) => t?.compId === selectedTabId)
            if (tabContent?.length === 1) {
                setSelectedTab(tabContent?.[0])
            } else {
                setSelectedTab(component?.children?.[0])
                setSelectedTabId(component?.children?.[0]?.compId)
            }
        }
    }, [component?.children, selectedTabId])
    return (
        <>
            {component?.layout === 'stacked' ? (
                <div className={` flex gap-x-5 `}>
                    <div className={`   shrink-0   border-y-[1px]  max-w-[280px] w-full  `}>
                        <div className={` flex flex-col`}>
                            {component?.children?.length > 0 &&
                                component?.children?.map((tab) => {
                                    return (
                                        <div
                                            className={`${
                                                selectedTabId === tab?.compId
                                                    ? `border-l-[4px] ${
                                                          [
                                                              'fcfd6fa1-4c95-42d3-a0fd-86c11629511d',
                                                              'f283dee2-2a36-4fac-a927-a7c6b301cbf1',
                                                          ].includes(component?.compId)
                                                              ? 'border-l-[#3e362e]'
                                                              : 'border-l-primaryColor'
                                                      }  font-bold`
                                                    : 'border-l-[2px] border-l-transparent font-normal'
                                            }  p-1  border-b-[1px] border-x-[1px]`}>
                                            <p
                                                onClick={() => setSelectedTabId(tab?.compId)}
                                                className={`${
                                                    [
                                                        'fcfd6fa1-4c95-42d3-a0fd-86c11629511d',
                                                        'f283dee2-2a36-4fac-a927-a7c6b301cbf1',
                                                    ].includes(component?.compId)
                                                        ? 'text-white'
                                                        : ''
                                                } cursor-pointer   py-2`}>
                                                {tab?.name}
                                            </p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div className={`  mt-0  w-full`}>{children(selectedTab)}</div>
                </div>
            ) : (
                <div>
                    <div className={`shrink-0 w-full   border-y-[1px]  `}>
                        <div className={` flex gap-x-10 items-center   `}>
                            {component?.children?.length > 0 &&
                                component?.children?.map((tab) => {
                                    return (
                                        <div
                                            className={`${
                                                selectedTabId === tab?.compId
                                                    ? `border-b-[2px] ${
                                                          component?.compId ===
                                                          'e2dbbf38-b65f-47b6-8306-50fdd74e5834'
                                                              ? 'border-[#3e362e]'
                                                              : 'border-primaryColor'
                                                      } `
                                                    : 'border-b-[2px] border-transparent'
                                            } `}>
                                            <p
                                                onClick={() => setSelectedTabId(tab?.compId)}
                                                className={` ${
                                                    component?.compId ===
                                                    'e2dbbf38-b65f-47b6-8306-50fdd74e5834'
                                                        ? 'text-white'
                                                        : ''
                                                } cursor-pointer  font-bold  py-4`}>
                                                {tab?.name}
                                            </p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div className={`  mt-2  w-full`}>{children(selectedTab)}</div>
                </div>
            )}
        </>
    )
}

export default EditorTabs
